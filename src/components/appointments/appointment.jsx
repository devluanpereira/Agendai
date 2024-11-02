

function Appointment(props) {
    // Concatena a data e hora para criar o objeto Date
    const dt = new Date(`${props.booking_date}T${props.booking_hour}`);
    
    // Formatação da data e hora com `-` e `h` no padrão brasileiro
    const dataFormatada = dt.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const horaFormatada = dt.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const dataHoraFormatada = `${dataFormatada} - ${horaFormatada}h`;

    // Formatação do preço para BRL
    const precoFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(props.price);

    return (
        <tr>
            <td>{props.user}</td>
            <td>{props.doctor}</td>
            <td>{props.service}</td>
            <td>{dataHoraFormatada}</td>
            <td>{precoFormatado}</td>
            <td className="text-end">
                {/* Botão de edição */}
                <button
                    onClick={() => props.clickEdit(props.id_appointment)}
                    className="btn btn-sm btn-primary me-2"
                    aria-label="Editar"
                >
                    <i className="bi bi-pencil-square"></i>
                </button>
                
                {/* Botão de exclusão */}
                <button
                    onClick={() => props.clickDelete(props.id_appointment)}
                    className="btn btn-sm btn-danger"
                    aria-label="Excluir"
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    );
}

export default Appointment;
