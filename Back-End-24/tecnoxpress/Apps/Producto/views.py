from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

def hello_world(request):
    return render(request, 'hello.html')


class HelloWorldView(TemplateView):
    template_name = 'hello.html'