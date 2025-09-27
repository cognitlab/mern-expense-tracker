import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/layouts/Income/IncomeOverview';
import Model from '../../components/layouts/Model';
import AddIncomeForm from '../../components/layouts/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import Incomelist from '../../components/layouts/Income/Incomelist';

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Sonething went wrong. Please try again.", error)
    } finally{
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //Validation Checks
    if (!source.trim()) {
      toast.error("Source is required!");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number > 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required!");
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModel(false);
      toast.success("Income Added Successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  //Delete Income
  const deleteIncome = async (id) => {};

  //handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => { 
    fetchIncomeDetails();
  
    return () => {};
  }, []);
  

  return (
   <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <Incomelist
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id});
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Model
         isOpen = {openAddIncomeModel}
         onClose={() => setOpenAddIncomeModel(false)}
         title="Add Income"
        >
        <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Model>

      </div>
    </DashboardLayout>
  );
};

export default Income;