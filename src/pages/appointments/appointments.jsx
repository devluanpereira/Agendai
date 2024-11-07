import "../../assets/css/appointments.css";
import Navbar from "../../components/navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointments/appointment";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import api from "../../constants/api";

function Appointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [idDoctor, setIdDoctor] = useState("");
    const [dtStart, setDtStart] = useState("");
    const [dtEnd, setDtEnd] = useState("");

    useEffect(() => {
        LoadDoctors();
        LoadAppointments();
    }, []);

    const LoadDoctors = async () => {
        try {
            const response = await api.get("/doctors");
            setDoctors(response.data || []);
        } catch (error) {
            handleApiError(error, "Erro ao carregar médicos");
        }
    };

    const LoadAppointments = async () => {
        if (!validateDates(dtStart, dtEnd)) return;

        try {
            const response = await api.get("/admin/appointments", {
                params: {
                    id_doctor: idDoctor,
                    dt_start: dtStart,
                    dt_end: dtEnd
                }
            });
            setAppointments(response.data || []);
        } catch (error) {
            handleApiError(error, "Erro ao carregar agendamentos");
        }
    };

    const validateDates = (startDate, endDate) => 
        (!startDate || !isNaN(new Date(startDate).getTime())) && 
        (!endDate || !isNaN(new Date(endDate).getTime())) ||
        alert("Data de início ou término inválida") && false;

    const handleApiError = (error, defaultMessage) => {
        const errorMessage = error.response?.data.error || defaultMessage;
        if (error.response?.status === 401) navigate("/");
        alert(errorMessage);
    };

    const DeleteAppointments = async (id) => {
        try {
            await api.delete(`/appointments/${id}`);
            LoadAppointments();
        } catch (error) {
            handleApiError(error, "Erro ao excluir agendamento");
        }
    };

    const ClickEdit = (id_appointment) => navigate(`/appointments/edit/${id_appointment}`);

    const ClickDelete = (id_appointment) => {
        confirmAlert({
            title: "Excluir",
            message: "Você tem certeza que deseja excluir este agendamento?",
            buttons: [
                { label: "Sim", onClick: () => DeleteAppointments(id_appointment) },
                { label: "Não" }
            ]
        });
    };

    const ChangeDoctor = (e) => setIdDoctor(e.target.value);

    return (
        <div className="container-fluid mt-page">
            <Navbar />
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <div className="mb-2">
                    <h2 className="d-inline">Agendamentos</h2>
                    <Link to="/appointments/add" className="btn btn-outline-primary ms-md-5 ms-0 mt-2 mt-md-0">
                        Novo Agendamento
                    </Link>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-end align-items-center">
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                        <input type="date" className="form-control me-2" onChange={(e) => setDtStart(e.target.value)} />
                        <span className="me-2">Até</span>
                        <input type="date" className="form-control me-2" onChange={(e) => setDtEnd(e.target.value)} />
                    </div>
                    <div className="form-control me-2">
                        <select value={idDoctor} onChange={ChangeDoctor}>
                            <option value="">Todos os médicos</option>
                            {doctors.map(doc => (
                                <option key={doc.id_doctor} value={doc.id_doctor}>
                                    {doc.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={LoadAppointments} className="btn btn-primary" type="button">Filtrar</button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Paciente</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Serviço</th>
                            <th scope="col">Data/Hora</th>
                            <th scope="col">Valor</th>
                            <th scope="col" className="col-buttons"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(ap => (
                            <Appointment
                                key={ap.id_appointment}
                                id_appointment={ap.id_appointment}
                                user={ap.user}
                                doctor={ap.doctor}
                                service={ap.service}
                                booking_date={ap.booking_date}
                                booking_hour={ap.booking_hour}
                                price={ap.price}
                                clickEdit={ClickEdit}
                                clickDelete={ClickDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Appointments;
