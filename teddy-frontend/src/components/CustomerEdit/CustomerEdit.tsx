import CustomerAccount from "../CustomerAccount/CustomerAccount";
import { IoMdAddCircle } from "react-icons/io";
import "./CustomerEdit.css";
import { BiEditAlt } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { AddressForm } from "../Forms/AddressForm";
import { Form } from "@unform/web";
import InputText from "../Form/InputText";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Select } from "../Form/SelectInput";
import Swal from "sweetalert2";
<<<<<<< HEAD:src/components/CustomerEdit/CustomerEdit.tsx

interface CustomerEditProps {
  email: string;
  fullName: string;
  cpf: string;
  gender: string;
  mainPhone: string;
  birthDate: string;
}
=======
import { SaveCustomer } from "../../service/customerService";
import { CustomerContextTiping, useCustomer } from "../../providers/Customer";
import { Address, Customer } from "../../types/customer";
import { useHistory } from "react-router";
import { DeleteAddress } from "../../service/addressService";
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/CustomerEdit/CustomerEdit.tsx

function CustomerEdit() {
  const { customer, setCustomer } = useCustomer() as CustomerContextTiping;
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const token = localStorage.getItem("token") || '';

  async function handleSubmit(data: Customer) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um e-mail válido")
          .required("O e-mail é obrigatório"),
        fullName: Yup.string().required("Nome é obrigatório"),
        gender: Yup.string()
          .test(
            "gender",
            "Selecione uma opção",
            (value = "") => Number(value) >= 0
          )
          .required("Sexo é obrigatório"),
        telNumber: Yup.string().required("Telefone principal obrigatório"),
        birthDate: Yup.string().required("Data de nascimento é obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current?.setErrors({});

<<<<<<< HEAD:src/components/CustomerEdit/CustomerEdit.tsx
      Swal.fire({
        icon: "success",
        title: "Dados Alterados com sucesso!",
        text: "",
        didClose: () => {
          history.push("/cliente/alterar_dados");
        },
      });

=======
      data.id = customer?.id;

      const onSuccess = () => {
        Swal.fire({
          icon: "success",
          title: "Dados Atualizados!",
        });
      };

      const onError = () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo deu errado por aqui!",
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

      SaveCustomer({ data, onSuccess, onError, token });
      setCustomer((prev) => {
        data.addressList = prev?.addressList;
        return data;
      });
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/CustomerEdit/CustomerEdit.tsx
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

<<<<<<< HEAD:src/components/CustomerEdit/CustomerEdit.tsx
  function handleDelete() {
    Swal.fire({
      title: 'Excluir endereço?',
      text: "Deseja deletar este endereço?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deletado!',
          'O endereço foi deletado.',
          'success',
        );
      }
    })
  }
=======
  useEffect(() => {
    if (customer) formRef?.current?.setData(customer);
  }, [customer]);

  function mapAddresses(addressType: number) {
    return customer?.addressList?.map((address, index) => {
      if (address.addressType !== addressType) return [];
      return (
        <li key={index}>
          {`${address.street}, nº ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}, CEP: ${address.postalCode}`}
          <div className="row mt-3 mb-4 d-flex justify-content-end">
            <div className="mr-3 ml-2">
              <button
                className="btn-sm btn btn-outline-primary"
                id="editar"
                onClick={() => {
                  setAddress(address);
                  setIsOpenForm(true);
                }}
              >
                <BiEditAlt fontSize={20} />
                Editar
              </button>
            </div>
            <div className="mr-3 ml-2">
              <button
                className="btn-sm btn btn-outline-danger"
                id="excluir"
                onClick={() => {
                  const onSuccess = () => {
                    Swal.fire({
                      icon: "success",
                      title: "Dados Atualizados!",
                    });

                    setCustomer((prev) => {
                      const newCustomerAddress = Object.assign({}, prev);
                      newCustomerAddress.addressList =
                        prev?.addressList?.filter(
                          (el) => el.id !== address.id
                        ) || [];
                      return newCustomerAddress;
                    });
                  };

                  const onError = () => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Algo deu errado por aqui ;( Entre em contato com o administrador",
                    });
                  };

                  DeleteAddress({ id: address?.id, onSuccess, onError, token });
                }}
              >
                <BsTrashFill fontSize={20} /> Excluir
              </button>
            </div>
          </div>
        </li>
      );
    });
  }

>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/CustomerEdit/CustomerEdit.tsx
  return (
    <>
      <CustomerAccount>
        <div className="row">
          <div className="col-sm-8 ">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row ">
                <div className="col-12 col-sm-12 mt-2">
                  <label>E-mail</label>
                  <InputText
                    type="text"
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="col-12 col-sm-12  mt-2">
                  <label>Nome</label>
                  <InputText
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    name="fullName"
<<<<<<< HEAD:src/components/CustomerEdit/CustomerEdit.tsx
                    id="fullName"
=======
                    id="nome"
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/CustomerEdit/CustomerEdit.tsx
                  />
                </div>

                <div className="col-8 col-sm-8  mt-2">
                  <label>CPF</label>
                  <InputText
                    type="text"
                    className="form-control"
                    placeholder="68684319028"
                    name="cpf"
<<<<<<< HEAD:src/components/CustomerEdit/CustomerEdit.tsx
=======
                    id="cpf"
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/CustomerEdit/CustomerEdit.tsx
                    disabled
                  />
                </div>

                <div className="col-6 col-sm-4 mt-2">
                  <label>Sexo</label>
                  <Select
                    name="gender"
                    id="gender"
                    className="form-control select_product"
                  >
                    <option value="">Selecione</option>
                    <option value="0">Feminino</option>
                    <option value="1">Masculino</option>
                    <option value="2">Indefinido</option>
                  </Select>
                </div>

                <div className="col-8 col-sm-8  mt-2">
                  <label>Telefone principal</label>
                  <InputText
                    type="text"
                    id="telNumber"
                    name="telNumber"
                    className="form-control"
                    placeholder="Telefone primario"
                    id="mainPhone"
                  />
                </div>
                <div className="col-6 col-sm-4  mt-2">
                  <label>Data de nascimento:</label>
                  <InputText
                    type="date"
                    id="birthDate"
                    className="form-control"
                    name="birthDate"
                  />
                </div>

                <div className="col mt-5 mb-5 d-flex justify-content-end">
                  <button
                    type="submit"
                    id="alterarCadastro"
                    className="buttom btn-block custumer_edit-buttom"
                  >
                    Alterar cadastro
                  </button>
                </div>
              </div>
            </Form>
          </div>

          <div className="col-4 col-sm-4">
            {!isOpenForm && (
<<<<<<< HEAD:src/components/CustomerEdit/CustomerEdit.tsx
              <div className={`${isOpenForm ? "d-none" : ""} border p-2`}>
                <span>Endereços de Entrega:</span>

                <ul className="m-0 p-0 mt-3">
                  <li>
                    Rua Carlos Barattino, n. 908 - Vila Nova Mogilar, Mogi das
                    Cruzes-SP - CEP 08773-600
                  </li>
                </ul>
                <div className="row mt-3 mb-0 d-flex justify-content-end">
                  <div className="mr-3 ml-2">
                    <span className="btn-sm btn btn-outline-primary" onClick={() => setIsOpenForm(true)}>
                      <BiEditAlt fontSize={20} />
                      Editar
                    </span>
                  </div>
                  <div className="mr-3 ml-2">
                    <span className="btn-sm btn btn-outline-danger" onClick={() => handleDelete()}>
                      <BsTrashFill fontSize={20} /> Excluir
                    </span>
                  </div>
                </div>
                <hr />
                <span>Endereços de Cobrança:</span>
                <ul className="m-0 p-0 mt-3">
                  <li>
                    Rua Carlos Barattino, n. 908 - Vila Nova Mogilar, Mogi das
                    Cruzes-SP - CEP 08773-600
                  </li>
                </ul>
                <div className="row mt-3 mb-0 d-flex justify-content-end">

                  <>
                    <div className="mr-3 ml-2">
                      <span className="btn-sm btn btn-outline-primary" onClick={() => setIsOpenForm(true)}>
                        <BiEditAlt fontSize={20} />
                        Editar
                      </span>
                    </div>
                    <div className="mr-3 ml-2">
                      <span className="btn-sm btn btn-outline-danger" onClick={() => handleDelete()}>
                        <BsTrashFill fontSize={20} /> Excluir
                      </span>
                    </div>
                  </>
=======
              <>
                <div className={`${isOpenForm ? "d-none" : ""} border p-2`}>
                  <span>Endereços de Entrega:</span>
                  <ul className="m-0 p-0 mt-3">{mapAddresses(1)}</ul>

                  <hr />

                  <span>Endereços de Cobrança:</span>
                  <ul className="m-0 p-0 mt-3">{mapAddresses(0)}</ul>
>>>>>>> 4d5e0368239b217fd2030850d766cc3c0512e58b:teddy-frontend/src/components/CustomerEdit/CustomerEdit.tsx
                </div>
              </>
            )}
            {isOpenForm && (
              <aside>
                <AddressForm
                  className="mt-2"
                  address={address}
                  setIsFormOpen={setIsOpenForm}
                />
                <button
                  className="btn btn-secondary btn-block mt-4"
                  onClick={() => setIsOpenForm(false)}
                >
                  Cancelar
                </button>
              </aside>
            )}
            {!isOpenForm && (
              <div
                className="col-12 col-sm-12  mt-3 align-items-center mt-4 border"
                onClick={() => {
                  setIsOpenForm(true);
                  setAddress(undefined);
                }}
              >
                <IoMdAddCircle
                  type="button"
                  className="col-12 align-items-center"
                  size={40}
                  color={"#FA98AF"}
                />
                <label
                  className=" col-12 font-weight-bold text-center"
                  id="adicionarNovoEndereco"
                >
                  Adicionar novo endereço
                </label>
              </div>
            )}
          </div>
        </div>
      </CustomerAccount>
    </>
  );
}

export default CustomerEdit;
