export const sum = (rows, field='amount') => rows.reduce((n,r)=>n+(Number(r[field])||0),0);
export const round = n => Math.round((Number(n)+Number.EPSILON)*100)/100;
export function availableCash(accounts){return sum(accounts,'balance')-sum(accounts,'committed');}
export function safeToSpend({available,plannedRemaining,debtRemaining=0,reserve=0,daysRemaining=1}){return {total:round(Math.max(0,available-plannedRemaining-debtRemaining-reserve)),daily:round(Math.max(0,available-plannedRemaining-debtRemaining-reserve)/Math.max(1,daysRemaining))};}
export function cashFlow(tx){const a=Math.abs(Number(tx.amount)||0); if(tx.type==='income')return a; if(tx.type==='transfer')return 0; return -a;}
export function monthsRemaining(targetDate, from=new Date()){const target=new Date(targetDate+'T12:00:00');return Math.max(1,Math.ceil((target-from)/(1000*60*60*24*30.4375)));}
export function sinkingContribution(target,current,targetDate,from){return round(Math.max(0,(target-current)/monthsRemaining(targetDate,from)));}
export function futureValue(balance,monthly,annualRate,years){const months=Math.max(0,Math.round(years*12)),r=(annualRate/100)/12; if(!r)return round(balance+monthly*months);return round(balance*Math.pow(1+r,months)+monthly*((Math.pow(1+r,months)-1)/r));}
export function debtAvalanche(loans,extraBudget){const active=loans.filter(l=>l.balance>0).sort((a,b)=>b.rate-a.rate||a.priority-b.priority||a.balance-b.balance);const minimums=sum(active,'minPayment');return {order:active,minimums,extra:Math.max(0,extraBudget-minimums),target:active[0]||null};}
export function affordability({cost,available,safe,essentialBuffer=0}){const room=Math.max(0,Math.min(available-essentialBuffer,safe));return {affordable:cost<=room,room,shortfall:Math.max(0,cost-room),message:cost<=room?'Affordable without touching commitments':'Not yet safe without reducing commitments or goals'};}
export function phase({debt,emergency,target}){if(debt>0)return 'Debt elimination';if(emergency<target)return 'Emergency fund';return 'Wealth building';}
export function savingsRate(invested,income){return income>0?round(invested/income*100):0;}
export function monthlyRequired(target,current,targetDate,from){return sinkingContribution(target,current,targetDate,from);}
