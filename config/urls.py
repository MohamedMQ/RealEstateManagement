from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("supersecret/", admin.site.urls),
]

admin.site.site_header = "Alpha Apartments Admin"
admin.site.site_title = "Alpha Apartments Admin Portal"
admin.site.index_title = "Welcome to Alpha Apartments Admin Portal"
