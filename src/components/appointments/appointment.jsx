

function Appointment(props) {

    //const dt = new Date(props.booking_date);

    const dt = new Date(props.booking_date + "T" + props.booking_hour);
    const dataformatada = dt.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })

    console.log(dataformatada)

    return <tr>
        <td>{props.user}</td>
        <td>{props.doctor}</td>
        <td>{props.service}</td>
        <td>{dataformatada}</td>
        <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}</td>
        <td className="text-end">
            <div className="d-inline me-2">
                <button onClick={() => props.clickEdit(props.id_appointment)}
                    className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>
            <button onClick={() => props.clickDelete(props.id_appointment)}
                className="btn btn-sm btn-danger">
                <i className="bi bi-trash-fill"></i>
            </button>
        </td>
    </tr>
}

export default Appointment;