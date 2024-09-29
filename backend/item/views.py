from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def item_view(*args, **kwargs):
    return HttpResponse("<h1>Item View<h1>")