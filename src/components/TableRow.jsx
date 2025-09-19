function TableRow({id, name, onDelete}) {
    return <tr>
        <td>{id}</td>
        <td className="left-align"><b>{name && name.substring(0,1)}</b> - {name}</td>
        <td><button onClick={onDelete}>Delete</button></td>
    </tr> 
    // <li key={id} className="left-align">
    //     <b></b> - {name}
    //     <button onClick={deleteCallback}>Delete</button>
    // </li>
}

export default TableRow;