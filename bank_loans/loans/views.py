from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import LoanProvider, LoanCustomer, BankPersonnel, LoanApplication
from .serializers import LoanProviderSerializer, LoanCustomerSerializer, BankPersonnelSerializer, LoanApplicationSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoanProviderView(viewsets.ModelViewSet):
    queryset = LoanProvider.objects.all()
    serializer_class = LoanProviderSerializer
    permission_classes = [IsAuthenticated]

class LoanCustomerView(viewsets.ModelViewSet):
    queryset = LoanCustomer.objects.all()
    serializer_class = LoanCustomerSerializer
    permission_classes = [IsAuthenticated]

class BankPersonnelView(viewsets.ModelViewSet):
    queryset = BankPersonnel.objects.all()
    serializer_class = BankPersonnelSerializer
    permission_classes = [IsAuthenticated]

class LoanApplicationView(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
