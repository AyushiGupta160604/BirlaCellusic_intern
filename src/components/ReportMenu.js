import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/reportMenu.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const reportOptions = [
    { value: 'agencyWiseStatus', label: 'Agency Wise Status' },
    { value: 'blockWiseStatus', label: 'Block Wise Status' },
    { value: 'withFeedback', label: 'With Feedback' },
    { value: 'withoutFeedback', label: 'Without Feedback' },
    { value: 'houseWiseDetails', label: 'House Wise Details' }
];

const ReportMenu = () => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleReportChange = (selectedOption) => {
        setSelectedReport(selectedOption);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedReport) {
            alert('Please select a report type');
            return;
        }

        setLoading(true);

        try {
            if (selectedReport.value === 'agencyWiseStatus') {
                console.log('Navigating with state:', {
                    fromDate: fromDate.toISOString(),
                    toDate: toDate.toISOString()
                }); // Debugging log
                navigate('/agency-report', {
                    state: {
                        fromDate: fromDate.toISOString(),
                        toDate: toDate.toISOString()
                    }
                });
            }
            if (selectedReport.value === 'blockWiseStatus') {
                console.log('Navigating with state:', {
                    fromDate: fromDate.toISOString(),
                    toDate: toDate.toISOString()
                }); // Debugging log
                navigate('/block-report', {
                    state: {
                        fromDate: fromDate.toISOString(),
                        toDate: toDate.toISOString()
                    }
                });
            }
            if (selectedReport.value === 'houseWiseDetails') {
                console.log('Navigating with state:', {
                    fromDate: fromDate.toISOString(),
                    toDate: toDate.toISOString()
                }); // Debugging log
                navigate('/house-report', {
                    state: {
                        fromDate: fromDate.toISOString(),
                        toDate: toDate.toISOString()
                    }
                });
            }
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate report.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="report-menu-container">
                <h2>Generate Report</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Report Type:</label>
                        <Select
                            options={reportOptions}
                            onChange={handleReportChange}
                            placeholder="Select Report Type"
                        />
                    </div>
                    <div className="form-group">
                        <label>From Date:</label>
                        <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>To Date:</label>
                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Generating...' : 'Generate Report'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReportMenu;