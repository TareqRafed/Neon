from django.db import models
from django.contrib.auth.models import User

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

# Create your models here.
class Artwork(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    discription = models.CharField(max_length=100, blank=True, null=True)
    height = models.IntegerField(default=0)
    width = models.IntegerField(default=0)
    image = models.ImageField(upload_to=user_directory_path ,height_field='height', width_field='width' )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} uploaded {self.discription} "






    