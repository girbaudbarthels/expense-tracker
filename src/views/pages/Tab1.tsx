import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../application/reducers';
import './Tab1.css';

import { actionCreators } from "../../application";
import { ExpensePayload } from '../../application/interfaces/expense-interface';
import { useEffect, useState } from 'react';
import { InputChangeEventDetail } from '@ionic/core';
const Tab1: React.FC = () => {


  const state: ExpensePayload[] = useSelector((state: RootState) => state.expenses)
  const dispatch = useDispatch();

  const { addExpense, removeExpense, getInitialData } = bindActionCreators(actionCreators, dispatch);

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
    <IonItem >
      <IonLabel onClick={() => { addExpense(input.name, input.price, input.date) }}>
        {d.name} - ${d.amount} - {d.date}
      </IonLabel>
      <IonButton onClick={() => { removeExpense(d) }}> Remove</IonButton>
    </IonItem>
  </IonItemSliding>)


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
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
        <IonButton onClick={() => {
          addExpense(input.name, input.price, input.date)
          input.name = "";
          input.price = 0;
          input.date = "";
        }}>Add expense</IonButton>
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
