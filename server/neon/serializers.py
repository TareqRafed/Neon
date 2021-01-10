from rest_framework import serializers
from django.contrib.auth.models import User
from neon.models import Artwork


class RegistrationSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)    
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id','username', 'password', )
        write_only_fields = ('password',)
        read_only_fields = ('id',)

        


class ArtworkSerializers(serializers.Serializer):
    user = serializers.CharField()
    discription = serializers.CharField()
    image = serializers.ImageField()
    created_at = serializers.DateTimeField()
    ratio = serializers.SerializerMethodField()

    def get_ratio(self, image):
        if image.height > image.width:
            return 'tall'
        else :
            return 'wide'

class UploadArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ('image', 'discription')
