from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


from .views import index

urlpatterns = [
    path('index', index, name='index'),
]

