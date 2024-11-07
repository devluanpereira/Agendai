import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import api from "../../constants/api";

function AppointmentAdd() {
    const navigate = useNavigate();
    const { id_appointment } = useParams();

    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);

    const [idUser, setIdUser] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    const handleApiError = (error, defaultMessage) => {
        const errorMessage = error.response?.data?.error || defaultMessage;
        if (error.response?.status === 401) return navigate("/");
        alert(errorMessage);
    };

    const LoadUsers = async () => {
        try {
            const response = await api.get("/admin/users");
            setUsers(response.data || []);
        } catch (error) {
            handleApiError(error, "Erro ao carregar pacientes");
        }
    };

    const LoadDoctors = async () => {
        try {
            const response = await api.get("/doctors");
            setDoctors(response.data || []);
            if (id_appointment) LoadAppointment(id_appointment);
        } catch (error) {
            handleApiError(error, "Erro ao carregar médicos");
        }
    };

    const LoadServices = async (doctorId) => {
        if (!doctorId) return;
        try {
            const response = await api.get(`/doctors/${doctorId}/services`);
            setServices(response.data || []);
        } catch (error) {
            handleApiError(error, "Erro ao carregar serviços");
        }
    };

    const LoadAppointment = async (appointmentId) => {
        try {
            const response = await api.get(`/admin/appointments/${appointmentId}`);
            const { id_user, id_doctor, id_service, booking_date, booking_hour } = response.data;
            setIdUser(id_user);
            setIdDoctor(id_doctor);
            setIdService(id_service);
            setBookingDate(booking_date);
            setBookingHour(booking_hour);
        } catch (error) {
            handleApiError(error, "Erro ao carregar agendamentos");
        }
    };

    const SaveAppoint = async () => {
        // Verifique se todas as variáveis estão definidas
        if (!idUser || !idDoctor || !idService || !bookingDate || !bookingHour) {
            return alert("Por favor, preencha todos os campos obrigatórios.");
        }
    
        const json = { id_user: idUser, id_doctor: idDoctor, id_service: idService, booking_date: bookingDate, booking_hour: bookingHour };
    
        try {
            const endpoint = id_appointment ? `/admin/appointments/${id_appointment}` : "/admin/appointments";
            const method = id_appointment ? api.put : api.post;
            const response = await method(endpoint, json);
            if (response.data) navigate("/appointments");
        } catch (error) {
            handleApiError(error, "Erro ao salvar dados");
        }
    };
    useEffect(() => {
        LoadUsers();
        LoadDoctors();
    }, []);

    useEffect(() => {
        LoadServices(idDoctor);
    }, [idDoctor]);

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-page">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12 mt-2">
                        <h2>{id_appointment ? "Editar Agendamento" : "Novo Agendamento"}</h2>
                    </div>
                    <div className="col-12 mt-4">
                        <label htmlFor="user" className="form-label">Paciente</label>
                        <select name="user" id="user" value={idUser} onChange={(e) => setIdUser(e.target.value)} className="form-control mb-2">
                            <option value="0">Selecione o paciente</option>
                            {users.map(d => <option key={d.id_user} value={d.id_user}>{d.name}</option>)}
                        </select>
                    </div>
                    <div className="col-12 mt-4">
                        <label htmlFor="doctor" className="form-label">Médico</label>
                        <select name="doctor" id="doctor" value={idDoctor} onChange={(e) => setIdDoctor(e.target.value)} className="form-control mb-2">
                            <option value="0">Selecione o médico</option>
                            {doctors.map(d => <option key={d.id_doctor} value={d.id_doctor}>{d.name}</option>)}
                        </select>
                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="service" className="form-label">Serviço</label>
                        <select name="service" id="service" value={idService} onChange={(e) => setIdService(e.target.value)} className="form-control mb-2">
                            <option value="0">Selecione o serviço</option>
                            {services.map(s => <option key={s.id_service} value={s.id_service}>{s.description}</option>)}
                        </select>
                    </div>
                    <div className="col-6 mt-3">
                        <label htmlFor="bookingDate" className="form-label">Data</label>
                        <input type="date" className="form-control" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                    </div>
                    <div className="col-6 mt-3">
                        <label htmlFor="bookingHour" className="form-label">Horário</label>
                        <select name="bookingHour" id="bookingHour" value={bookingHour} onChange={(e) => setBookingHour(e.target.value)} className="form-control mb-2">
                            <option value="00:00">Horário</option>
                            <option value="09:00">09:00</option>
                            <option value="09:30">09:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:30">11:30</option>
                        </select>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                            <Link to="/appointments" className="btn btn-outline-primary me-3">Cancelar</Link>
                            <button className="btn btn-primary" type="button" onClick={SaveAppoint}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppointmentAdd;
