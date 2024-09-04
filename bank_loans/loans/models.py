from django.db import models
from django.contrib.auth.models import User

class LoanProvider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_funds = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Provider: {self.user.username}"

class LoanCustomer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_term_months = models.IntegerField()
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Customer: {self.user.username}"

class BankPersonnel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Personnel: {self.user.username}"

class LoanApplication(models.Model):
    REQUEST_TYPE_CHOICES = [
        ('FUND', 'Fund Request'),
        ('LOAN', 'Loan Request'),
    ]
    customer = models.ForeignKey(LoanCustomer, on_delete=models.CASCADE)
    amount_requested = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='Pending')
    request_type = models.CharField(max_length=10, choices=REQUEST_TYPE_CHOICES, default='LOAN')

    def __str__(self):
        return f"Application by {self.customer.user.username} - Status: {self.status}, Type: {self.get_request_type_display()}"

