from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def donor_view(*args,**kwargs):
    return HttpResponse("<h1>Donor Page View<h1>")