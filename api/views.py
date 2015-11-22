from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'home.html',{})

def item(request):
    return render(request,'item.html',{"name":"Nguyen Ba Ngoc"})