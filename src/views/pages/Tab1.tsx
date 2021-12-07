import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../application/reducers';
import './Tab1.css';

import { actionCreators } from "../../application";
import { ExpensePayload } from '../../application/interfaces/expense-interface';
import { useEffect, useState } from 'react';
import { InputChangeEventDetail } from '@ionic/core';
import { removeCircle } from 'ionicons/icons';
const Tab1: React.FC = () => {


  const state: ExpensePayload[] = useSelector((state: RootState) => state.expenses)
  const dispatch = useDispatch();

  const { addExpense, removeExpense, getInitialData } = bindActionCreators(actionCreators, dispatch);
  const [totalAmount, setAmount] = useState({
    value: 0,
  });

  useEffect(() => {
    totalAmount.value = 0
    let totExpenses: number = 0;
    state.map((d) => {
     totExpenses = totExpenses+d.amount
    });
    setAmount({ value: totExpenses })

  }, [state]);


  const [input, setInput] = useState({
    name: "",
    price: 0,
    date: "",
  })

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const listExpenses = state.map((d, index) => <IonItemSliding key={index}>
    <IonItem color={d.amount<100?"success":d.amount>1000?"danger":"warning"}>
      <IonLabel onClick={() => { addExpense(input.name, input.price, input.date) }}>
        {d.name} - ${d.amount} - {d.date}
      </IonLabel>
      <IonIcon icon={removeCircle} onClick={() => { removeExpense(d) }} />
    </IonItem>
  </IonItemSliding>)

  const [present] = useIonAlert();

  return (
    <IonPage>

      <IonContent fullscreen >
        <div className="widthMax" >
        <div ><h1 className="headerTextSum" >${totalAmount.value}</h1></div>

<IonList>
  {listExpenses}

</IonList>
<IonInput
  type="text"
  name="name"
  value={input.name}
  placeholder="Expense name"
  onIonChange={e => {
    console.log(e.detail.value);

    setInput({ name: e.detail.value!, price: input.price, date: input.date })
  }}
>
</IonInput>
<IonInput
  type="number"
  name="price"
  value={input.price}
  placeholder="Expense price"
  onIonChange={e => {
    console.log(e.detail.value);

    setInput({ name: input.name, price: +e.detail.value!, date: input.date })
  }}
>
</IonInput>
<IonInput
  type="date"
  name="date"
  value={input.date}
  placeholder="Expense date"
  onIonChange={e => {
    console.log(e.detail.value);

    setInput({ name: input.name, price: input.price, date: e.detail.value! })
  }}

>
</IonInput>
<IonButton
  expand="block"
  onClick={() => {
    present({
      inputs: [],
      buttons: ['Cancel', {
        text: 'Add', handler: (d) => {

          addExpense(input.name, input.price, input.date)
          input.name = "";
          input.price = 0;
          input.date = "";

        }
      }]
    })
  }}>Add expense</IonButton>
        </div>
        
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
