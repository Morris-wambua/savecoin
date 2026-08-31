export const APP = {
  name: 'SaveCoin', shortName: 'SaveCoin', currency: 'KES', locale: 'en-KE',
  referenceDate: '2026-08-31', dbName: 'savecoin', dbVersion: 1
};

export const STORES = [
  'settings','accounts','transactions','budgets','loans','loanPayments','investments',
  'investmentTransactions','emergencyFunds','sinkingFunds','dailyCloses','monthlyCloses',
  'reminders','recommendations','recurringCommitments'
];

export const CATEGORIES = {
  'Everyday essentials': ['Rent','Transport','Breakfast','Lunch','Dinner','Groceries','Weekend food','Water','Electricity','Wi-Fi','Utilities','Airtime'],
  'Household & personal': ['Household','Toiletries','Clothing','Medical','Family / support','Professional expenses','Home maintenance'],
  'Lifestyle': ['Entertainment','Travel','ChatGPT','Subscriptions','Electronics','Insurance','Christmas / holidays','Miscellaneous'],
  'Money movement': ['M-PESA charges','Debt payment','Emergency fund','Sinking fund','Investment','Transfer'],
  'Income': ['Salary','Refund / repayment','Investment income','Other income']
};

export const DEFAULTS = {
  settings: { id: 'profile', salary: 0, debtBudget: 0, livingTarget: 0,
    wealthTarget: 0, emergencyTarget: 0, workdays: 21.7, theme: 'dark',
    hideBalances: false, setupComplete: false, currentPhase: 'debt' },
  accounts: [
    {id:'operating-cash',name:'Operating cash',type:'cash',balance:0,committed:0,liquidity:'same-day'},
    {id:'long-term-investment',name:'Long-term investment',type:'investment',balance:0,committed:0,expectedReturn:0,liquidity:'lower'}
  ],
  loans: [],
  budgets: [
    {id:'rent',name:'Rent',amount:0,kind:'essential'}, {id:'water',name:'Water',amount:0,kind:'essential'},
    {id:'electricity',name:'Electricity',amount:0,kind:'essential'}, {id:'wifi',name:'Wi-Fi',amount:0,kind:'essential'},
    {id:'transport',name:'Transport',amount:0,kind:'essential'}, {id:'lunch',name:'Lunch',amount:0,kind:'essential'},
    {id:'breakfast',name:'Breakfast',amount:0,kind:'essential'}, {id:'chatgpt',name:'ChatGPT',amount:0,kind:'planned'},
    {id:'flexible',name:'Flexible living',amount:0,kind:'flexible'}
  ],
  recurringCommitments: [
    {id:'rent',name:'Rent',amount:0,dueDay:1,category:'Rent'}, {id:'wifi',name:'Wi-Fi',amount:0,dueDay:5,category:'Utilities'},
    {id:'water',name:'Water',amount:0,dueDay:5,category:'Utilities'}, {id:'electricity',name:'Electricity',amount:0,dueDay:5,category:'Utilities'},
    {id:'chatgpt',name:'ChatGPT',amount:0,dueDay:10,category:'Subscriptions'}
  ],
  recommendations: [],
  reminders: [
    {id:'daily-close',name:'Daily close',schedule:'Every evening',enabled:true},
    {id:'weekly-review',name:'Weekly review',schedule:'Sunday evening',enabled:true},
    {id:'monthly-close',name:'Monthly close',schedule:'Last day of month',enabled:true},
    {id:'payday',name:'Payday runbook',schedule:'Monthly payday',enabled:true}
  ]
};
