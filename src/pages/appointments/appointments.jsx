import "../../assets/css/appointments.css";
import Navbar from "../../components/navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointments/appointment";
import { useEffect, useState } from "react";
import api from "../../constants/api";

function Appointments() {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [idDoctor, setIdDoctor] = useState("");
    const [dtStart, setDtStart] = useState("");
    const [dtEnd, setDtEnd] = useState("");

    function ClickEdit(id_appointment) {
        navigate("/appointments/edit/" + id_appointment);
    }

    function ClickDelete(id_appointment) {
        console.log("Excluir " + id_appointment);
    }

    async function LoadDoctors() {

        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);

            }
            else
                alert("Erro ao carregar médicos");
        }
    }


    async function LoadAppointments() {
        //console.log("LoadAppointments..");
    
        const isValidDate = (dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        };
    
        if (dtStart && !isValidDate(dtStart)) {
            alert("Invalid start date");
            return;
        }
    
        if (dtEnd && !isValidDate(dtEnd)) {
            alert("Invalid end date");
            return;
        }
    
        try {
            const response = await api.get("/admin/appointments", {
                params: {
                    id_doctor: idDoctor,
                    dt_start: dtStart,
                    dt_end: dtEnd
                }
            });
    
            if (response.data) {
                setAppointments(response.data);
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao carregar appointments");
        }
    }

    function ChangeDoctor(e) {
        setIdDoctor(e.target.value);
    }

    useEffect(() => {
        LoadDoctors();
        LoadAppointments();
    }, []);

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
                        <input id="startDate" className="form-control me-2" type="date" onChange={(e) => setDtStart(e.target.value)} />
                        <span className="me-2">Até</span>
                        <input id="endDate" className="form-control me-2" type="date" onChange={(e) => setDtEnd(e.target.value)} />
                    </div>

                    <div className="form-control me-2">
                        <select name="doctor" id="doctor" value={idDoctor} onChange={ChangeDoctor} >
                            <option value="">Todos os médicos</option>
                            {doctors.map((doc) => (
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
                            <th scope="col" className="text-end">Valor</th>
                            <th scope="col" className="col-buttons"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((ap) => (
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
