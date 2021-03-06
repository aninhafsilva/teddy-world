import { AiOutlineCreditCard, AiOutlineDelete } from "react-icons/ai";
import { BiCalendarHeart } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { TiSortNumerically } from "react-icons/ti";
import { ModalTeddy } from "../components/Modal/Modal";
import { CreditCardForm } from "../components/Forms/CreditCardForm";
import { useState } from "react";
import { Table } from "react-bootstrap";
import CustomerAccount from "../components/CustomerAccount/CustomerAccount";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { DeleteCard, GetCreditCardByUser } from "../service/cardsService";
import { CustomerContextTiping, useCustomer } from "../providers/Customer";
import Swal from "sweetalert2";

export interface CreditCard {
  id?: string;
  createdAt?: string;
  deletedAt?: string;
  cardHolder: string;
  creditCardNumber: string;
  cardMonth: string;
  cardYear: string;
  cardSecurity: string;
  cardFavourite: boolean;
  cardFlag: string;
}

function Cards() {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token") || "";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams<{ id: string }>();

  const { customer, setCustomer } = useCustomer() as CustomerContextTiping;

  useEffect(() => {
    const onSuccess = (resp: any) => {
      setCustomer((prev) => {
        const newCustomer = Object.assign({}, prev);

        newCustomer.creditCardList = resp.data;

        return newCustomer;
      });
    };
    GetCreditCardByUser({
      id,
      onSuccess,
      token,
    });
  }, [id, token, setCustomer]);

  return (
    <CustomerAccount>
      <section className="border">
        <Table hover>
          <thead>
            <tr>
              <th>
                <BiCalendarHeart size={20} className="icon" /> Data de criação
              </th>
              <th>
                <TiSortNumerically size={20} className="icon" /> Número
              </th>
              <th>
                <AiOutlineCreditCard size={20} className="icon" /> Bandeira
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customer?.creditCardList?.map((el, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle">
                    <span>{el.createdAt}</span>
                  </td>
                  <td className="align-middle">****{el.creditCardNumber}</td>
                  <td className="align-middle">{el.cardFlag}</td>
                  <td className="align-middle">
                    <div className="d-flex m-auto">
                      <div className="m-auto">
                        <button
                          className="m-auto btn btn-sm btn-outline-danger"
                          onClick={() => {
                            const onSuccess = () => {
                              Swal.fire({
                                icon: "success",
                                title: "Dados atualizados com sucesso!",
                              });

                              setCustomer((prev) => {
                                let newCustomer = Object.assign([], prev);

                                newCustomer.creditCardList =
                                  newCustomer?.creditCardList?.filter(
                                    (card) => card?.id !== el.id
                                  );

                                return newCustomer;
                              });
                            };

                            DeleteCard({
                              onSuccess,
                              id: el.id,
                              token,
                            });
                          }}
                        >
                          <AiOutlineDelete fontSize={24} className="m-auto" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div className="d-flex p-4">
          <div
            className="col-12 col-sm-12  mt-3 align-items-center mt-4 border"
            onClick={handleShow}
          >
            <IoMdAddCircle
              type="button"
              className="col-12 align-items-center"
              size={40}
              color={"#FA98AF"}
            />
            <label className=" col-12 font-weight-bold text-center">
              Adicionar novo cartão
            </label>
          </div>
        </div>
      </section>

      <ModalTeddy
        handleClose={handleClose}
        show={show}
        title="Adicionar Novo Cartão"
      >
        <CreditCardForm />
      </ModalTeddy>
    </CustomerAccount>
  );
}

export default Cards;
