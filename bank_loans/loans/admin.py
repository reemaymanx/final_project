from django.contrib import admin
from .models import LoanProvider, LoanCustomer, BankPersonnel, LoanApplication

admin.site.register(LoanProvider)
admin.site.register(LoanCustomer)
admin.site.register(BankPersonnel)
admin.site.register(LoanApplication)
