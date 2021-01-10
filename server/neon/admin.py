from django.contrib import admin
from neon.models import Artwork
from django.utils.html import format_html
# Register your models here.
class ArtworkAdmin(admin.ModelAdmin):
    fields = ('user', 'discription', 'image','image_tag', 'created_at')
    readonly_fields = ('image_tag', 'created_at')

    def image_tag(self,obj):
        return format_html('<img src="{0}" style="max-width:720px;" />'.format(obj.image.url))
admin.site.register(Artwork, ArtworkAdmin)