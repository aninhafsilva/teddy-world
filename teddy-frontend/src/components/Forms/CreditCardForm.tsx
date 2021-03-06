import { useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Select } from "../Form/SelectInput";
import { useState } from "react";
import { SaveCreditCard } from "../../service/cardsService";
import InputText from "../Form/InputText";
import * as Yup from "yup";
import * as CardValidator from "card-validator";
import Swal from "sweetalert2";
import { CreditCard } from "../../types/card";
import { useHistory } from "react-router";
import { CustomerContextTiping, useCustomer } from "../../providers/Customer";

export function CreditCardForm() {
  const formRef = useRef<FormHandles>(null);
  const token = localStorage.getItem("token");
  const [cardFlag, setCardFlag] = useState<string | undefined>("");
  const { customer, setCustomer } = useCustomer() as CustomerContextTiping;
  const history = useHistory();

  async function handleSubmit(data: CreditCard) {
    try {
      const schema = Yup.object().shape({
        cardHolder: Yup.string().required("Nome do titular é obrigatório."),
        creditCardNumber: Yup.string()
          .required("Número do cartão é obrigatório")
          .test(
            "Número do cartão de crédito",
            "Número do cartão de crédito é inválido",
            (value) => CardValidator.number(value).isValid
          ),
        cardMonth: Yup.string()
          .required("Mês do cartão é obrigatório")
          .test(
            "Mês do cartão de crédito",
            "Cartão de crédito é inválido",
            (value) =>
              CardValidator.expirationDate(value + data.cardYear!).isValid
          ),
        cardYear: Yup.string()
          .required("Ano do cartão é obrigatório")
          .test(
            "Ano do cartão de crédito",
            "Cartão de crédito é inválido",
            (value) =>
              CardValidator.expirationDate(data.cardMonth! + value).isValid
          ),
        cardSecurity: Yup.string()
          .required("CVV obrigatório")
          .test(
            "CVV",
            "Código de segurança é inválido",
            (value) => CardValidator.cvv(value).isValid
          ),
        cardFlag: Yup.string().required("Bandeira é obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current?.setErrors({});
<<<<<<< HEAD:src/components/Forms/CreditCardForm.tsx
      
      history.push("/cliente/pedidos");
=======

      if (customer?.id) {
        data.customer = { id: customer.id };
      }

      const onSuccess = (resp: any) => {
        Swal.fire({
          icon: "success",
          title: "Cartão Salvo!",
        });

        setCustomer((prev: any) => {
          const newCustomer = Object.assign({}, prev)
          newCustomer.creditCardList?.push(resp.data)

          return newCustomer;
        })
      };

      const onError = (resp: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<h5>Algo deu errado por aqui</h5>
            <p>${resp}</p>`,
        });
      };

      if (token === null) {
        Swal.fire({
          icon: "warning",
          title: "Você precisa estar logado para acessar este recurso",
        });

        history.push("/login");
        return;
      }

      SaveCreditCard({ data, onSuccess, onError, token });
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/Forms/CreditCardForm.tsx
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessage: { [key: string]: string } = {};

        error.inner.forEach((err) => {
          if (err.path) errorMessage[err.path] = err.message;
        });

        formRef.current?.setErrors(errorMessage);
      }
    }
  }

  function cardFlags(number: string) {
    var re: { [key: string]: RegExp } = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro:
        /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    };

    for (var key in re) {
      if (re[key].test(number)) {
        return key.toLocaleUpperCase();
      }
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="creditCardNumber">Número do Cartão de Crédito</label>
        <InputText
          type="text"
          name="creditCardNumber"
          id="creditCardNumber"
          className="form-control"
          placeholder="1234-1234-1234-1234"
          onChange={(val) => {
            if (val.currentTarget.value?.length > 14) {
              let number = val.currentTarget.value
                .replaceAll("-", "")
                .replaceAll(" ", "")
                .replaceAll(/^\s+|\s+$/g, "");
              let flag = cardFlags(number);
              setCardFlag(flag);
            }
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cardHolder">Nome do Títular</label>
        <InputText
          type="text"
          className="form-control"
          name="cardHolder"
          id="cardHolder"
<<<<<<< HEAD:src/components/Forms/CreditCardForm.tsx
          placeholder="Nome do Titular do Cartão"
=======
          placeholder="Nome do titular do Cartão"
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/Forms/CreditCardForm.tsx
        />
      </div>

      <div className="d-flex">
        <div className="form-group mr-3">
          <label htmlFor="cardMonth">Mês</label>
          <InputText
            type="number"
            className="form-control"
            name="cardMonth"
            id="cardMonth"
            step="1"
            min="1"
            placeholder="12"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardYear">Ano</label>
          <InputText
            type="number"
            className="form-control"
            name="cardYear"
            id="cardYear"
            step="1"
            min="1"
            placeholder="2021"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cardSecurity">CVV</label>
        <InputText
          className="form-control"
          name="cardSecurity"
          id="cardSecurity"
          placeholder="0000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cardSecurity">Bandeira</label>
        <InputText
          className="form-control"
          name="cardFlag"
          id="cardFlag"
          placeholder="MasterCard"
          defaultValue={cardFlag}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cardFavourite">
          Deseja tornar como cartão preferencial?
        </label>
        <Select className="form-control" name="cardFavourite" defaultValue={0}>
          <option value={1}>Sim</option>
          <option value={0}>Não</option>
        </Select>
      </div>

      <button className="buttom btn-block mt-5" id="addCard" >Adicionar Cartão</button>
    </Form>
  );
}
