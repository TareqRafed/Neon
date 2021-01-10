from django.shortcuts import render
from neon.serializers import ArtworkSerializers, RegistrationSerializer, UploadArtworkSerializer
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from neon.pagination import ArtworkPageNumberPagination
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from neon.models import Artwork


from django.core.files.images import get_image_dimensions

class ArtworkAPI(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializers
    pagination_class = ArtworkPageNumberPagination
    
class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny 
    ]
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs): # <- here i forgot self
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['POST',])
@permission_classes([permissions.IsAuthenticated])
def UploadImageView(request):
    artwork = Artwork.objects.create(user=request.user, )
    if(not request.FILES['image']):
        return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        
        if 'image' in request.FILES['image'].content_type:
            artwork.image = request.FILES['image']
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        width, height = get_image_dimensions(artwork.image)
        artwork.height = height
        artwork.width = width
        artwork.discription = request.POST.get('discription', None) 
        artwork.save()
        return Response(status=status.HTTP_201_CREATED)

