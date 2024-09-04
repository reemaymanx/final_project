#this is simple test to test that login page is working as desired
#when you write username:provider password:1234 it goes to loan provider page
#when you write username:customer password:1234 it goes to loan customer page
#when you write username:bank_staff password:1234 it goes to bank personnel page 
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import LoanProvider, BankPersonnel, LoanCustomer

class LoginRedirectTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        
        # Create users with different roles
        self.provider_user = User.objects.create_user(username='provider', password='password123')
        self.bank_staff_user = User.objects.create_user(username='bank_staff', password='password123')
        self.customer_user = User.objects.create_user(username='customer', password='password123')
        
        # Create corresponding roles
        LoanProvider.objects.create(user=self.provider_user, total_funds=10000)
        BankPersonnel.objects.create(user=self.bank_staff_user)
        LoanCustomer.objects.create(user=self.customer_user, loan_amount=5000, loan_term_months=12, status='Pending')

    def test_login_and_redirect_provider(self):
        response = self.client.post('/api/token/', {'username': 'provider', 'password': 'password123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Extract the token
        token = response.data['access']
        
        # Test redirect to provider page
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        response = self.client.get('/api/providers/')  # Adjust this URL to match your provider dashboard endpoint
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_and_redirect_bank_staff(self):
        response = self.client.post('/api/token/', {'username': 'bank_staff', 'password': 'password123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Extract the token
        token = response.data['access']
        
        # Test redirect to bank staff page
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        response = self.client.get('/api/bank_personnel/')  # Adjust this URL to match your bank staff dashboard endpoint
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_and_redirect_customer(self):
        response = self.client.post('/api/token/', {'username': 'customer', 'password': 'password123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Extract the token
        token = response.data['access']
        
        # Test redirect to customer page
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        response = self.client.get('/api/customers/')  # Adjust this URL to match your customer dashboard endpoint
        self.assertEqual(response.status_code, status.HTTP_200_OK)
