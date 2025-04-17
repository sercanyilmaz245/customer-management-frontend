"use client"
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { useRouter } from 'next/navigation';
import { 
  addCustomer,
  updateCustomer,
  deleteCustomerById,
  getAllCustomerByPage
} from '../_app/customer'

import TopMenu from './_component/TopMenu';

import { MdModeEdit, MdDelete } from "react-icons/md";

export default function DashboardPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [customers, setCustomers] = useState([]);

  const [isWaiting, setIsWaiting] = useState(false)

  const [editPopUpOpen, setEditPopUpOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    surname: '',
    identificationNumber: '',
    registerDate: '',
    address: '',
    city: '',
    email: '',
    phoneNumber: ''
  });
  const [editErrors, setEditErrors] = useState({});

  const handleEdit = (customer) => {
    setEditForm({ ...customer });
    setEditPopUpOpen(true);
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    identificationNumber: '',
    registerDate: '',
    address: '',
    city: '',
    email: '',
    phoneNumber: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const validateFormFields = (data) => {
    const errors = {};
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && !value.trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    return errors;
  };

  const handleAdd = () => {
    setPopupOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteCustomerById(id);
      if (res.status === 200) {
        setCustomers(customers.filter((c) => c.id !== id));
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const getAllCustomers = async () => {
    try {
      setIsWaiting(true)
      const res = await getAllCustomerByPage(page);
      if (res.status === 200) {
        setCustomers(res.data.content);
        setTotalPage(res.data.totalPages);
      }
    } catch (err) {
      alert('Fetching customer failed');
    } finally {
      setIsWaiting(false)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getAllCustomers();
    }
  }, [page]);

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateFormFields(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const res = await addCustomer(formData);
      setFormData({
        name: '',
        surname: '',
        identificationNumber: '',
        registerDate: '',
        address: '',
        city: '',
        email: '',
        phoneNumber: ''
      });
      setPopupOpen(false);
      setFormErrors({});
      setPage(0);
      getAllCustomers();
    } catch (err) {
      alert('Adding customer failed');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      surname: '',
      identificationNumber: '',
      registerDate: '',
      address: '',
      city: '',
      email: '',
      phoneNumber: ''
    });
    setFormErrors({});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = validateFormFields(editForm);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    try {
      const res = await updateCustomer(editForm);
      setEditForm({
        id: '',
        name: '',
        surname: '',
        identificationNumber: '',
        registerDate: '',
        address: '',
        city: '',
        email: '',
        phoneNumber: ''
      });
      if (res.status === 200) {
        setEditPopUpOpen(false);
        setEditErrors({});
        getAllCustomers();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const renderInput = (name, value, onChange, errors, key) => (
    <div key={key}>
      <input
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        type={name === 'registerDate' ? 'date' : name === 'email' ? 'email' : name === 'phoneNumber' ? 'tel' : 'text'}
        inputMode={name === 'email' ? 'email' : name === 'phoneNumber' ? 'tel' : 'text'}
        maxLength={name === "address" ? 500 : name === "identificationNumber" ? 11 : 250}
        pattern={name === "phoneNumber" || name === "identificationNumber" ? "\\d*" : ".*"}
        value={value}
        onChange={(e) => {
          onChange(e);
          errors[name] && setFormErrors({ ...errors, [name]: '' });
        }}
        className={`${styles.input} ${errors[name] ? styles.inputError : ''}`}
      />
      {errors[name] && <div className={styles.errorText}>{errors[name]}</div>}
    </div>
  );

  const renderEditInput = (name, value, onChange, errors, key) => (
    <div key={key}>
      <input
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        type={name === 'registerDate' ? 'date' : name === 'email' ? 'email' : name === 'phoneNumber' ? 'tel' : 'text'}
        inputMode={name === 'email' ? 'email' : name === 'phoneNumber' ? 'tel' : 'text'}
        pattern={name === "phoneNumber" || name === "identificationNumber" ? "\\d*" : ".*"}
        maxLength={name === "address" ? 500 : name === "identificationNumber" ? 11 : 250}
        value={value}
        onChange={(e) => {
          onChange(e);
          errors[name] && setEditErrors({ ...errors, [name]: '' });
        }}
        className={`${styles.input} ${errors[name] ? styles.inputError : ''}`}
      />
      {errors[name] && <div className={styles.errorText}>{errors[name]}</div>}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleDiv}>
          <h2>Dashboard</h2>
          {isWaiting ? 
              <div className='loader'></div>
          :
            null
          }
        </div>
        <TopMenu onLogout={handleLogout} />
      </div>

      <div className={styles.main}>
        <div className={styles.buttonContainer}>
          <button className={styles.addButton} onClick={handleAdd}>
            Add Customer
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>id</th>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>City</th>
                <th>Register Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.identificationNumber}</td>
                  <td>{customer.name}</td>
                  <td>{customer.surname}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.registerDate}</td>
                  <td>
                    <div className={styles.actionContainer}>
                      <button className={styles.actionBtn} onClick={() => handleEdit(customer)}>
                        <MdModeEdit color="#fff" size={20} />
                      </button>
                      <button className={styles.actionBtn} onClick={() => handleDelete(customer.id)}>
                        <MdDelete color="#fff" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          {Array.from({ length: totalPage }).map((_, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${page === index ? styles.activePage : ''}`}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {popupOpen && (
        <div className={styles.popupOverlay}>
          <form onSubmit={handleSave} className={styles.popup}>
            <h3>Add New Customer</h3>
            {Object.keys(formData).map((key, index) =>
              renderInput(key, formData[key], (e) => setFormData({ ...formData, [key]: e.target.value }), formErrors, index)
            )}
            <div className={styles.popupButtons}>
              <button className={styles.saveButton} type='submit'>Save</button>
              <button className={styles.clearButton} type='button' onClick={handleClear}>Clear</button>
              <button className={styles.closeButton} type='button' onClick={() => setPopupOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      )}

      {editPopUpOpen && (
        <div className={styles.popupOverlay}>
          <form onSubmit={handleUpdate} className={styles.popup}>
            <h3>Edit Customer</h3>
            {Object.keys(editForm).filter(k => k !== 'id').map((key, index) =>
              renderEditInput(key, editForm[key], (e) => setEditForm({ ...editForm, [key]: e.target.value }), editErrors, index)
            )}
            <div className={styles.popupButtons}>
              <button className={styles.saveButton} type='submit'>Update</button>
              <button className={styles.closeButton} type='button' onClick={() => setEditPopUpOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
