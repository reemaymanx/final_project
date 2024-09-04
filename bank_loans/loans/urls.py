from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoanProviderView, LoanCustomerView, BankPersonnelView, LoanApplicationView, UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'providers', LoanProviderView, basename='loanprovider')
router.register(r'customers', LoanCustomerView, basename='loancustomer')
router.register(r'bank_personnel', BankPersonnelView, basename='bankpersonnel')
router.register(r'applications', LoanApplicationView, basename='loanapplication')

urlpatterns = [
    path('', include(router.urls)), 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

