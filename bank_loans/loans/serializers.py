from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LoanProvider, LoanCustomer, BankPersonnel, LoanApplication

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class LoanProviderSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = LoanProvider
        fields = ('id', 'user', 'total_funds')

class LoanCustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = LoanCustomer
        fields = ('id', 'user', 'loan_amount', 'loan_term_months', 'status')

class BankPersonnelSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = BankPersonnel
        fields = ('id', 'user')

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = ('id', 'customer', 'amount_requested', 'status', 'request_type')
