from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def center_view(*args,**kwargs):
    return HttpResponse("<h1>Center page<h2>")