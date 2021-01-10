"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import neon.views as views
from rest_framework.authtoken import views as token

react_routes = getattr(settings, 'REACT_ROUTES', [])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')), # get index.html from frontend/build
    path('artwork/', views.ArtworkAPI.as_view()),
    path('login/', token.obtain_auth_token),
    path('logout/', views.Logout.as_view()),
    path('register/', views.CreateUserView.as_view()),
    path('upload/', views.UploadImageView)
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


for route in react_routes:
    urlpatterns += [
        path('{}'.format(route), TemplateView.as_view(template_name='index.html'))
    ]