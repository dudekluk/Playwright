export const PaymentnData = {
  CorrectPayment: {
    paymentAmount: '200',
    paymentTitle: 'Przelew za robotę',
    recipientName: 'Marek',
    bankAccount: '12 3456 7890 1234 5678 9012 3456 7890',
  },
  EmptyAccount: {
    paymentAmount: '4500',
    paymentTitle: 'Wypłata za mieś czerwiec',
    recipientName: 'Łukasz',
    bankAccount: '',
    errorMessage: 'pole wymagane',
  },
  EmptyName: {
    paymentAmount: '150',
    paymentTitle: 'Zakup artykułów spożywczych',
    recipientName: '',
    bankAccount: '12 3456 7890 1234 5678 9012 3456 7890',
    errorMessage: 'pole wymagane',
  },
};
