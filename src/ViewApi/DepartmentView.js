import React, { useState, useEffect } from 'react'
import departmentApi from '../api/departmentApi'
import DepartmentAdd from './DepartmentAdd'

export default function DepartmentView() {
    const [department, setDepartment] = useState([])
    const [display, setDisplay] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [values, setValues] = useState({
        region_id: undefined,
        department_name: '',
        location_id: undefined
    })

    useEffect(() => {
        departmentApi.get().then(data => {
            setDepartment(data)
        })
        setRefresh(false)
    }, [refresh])

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = async () => {
        const payload = {
            department_name: (values.department_name),
            location_id: (values.location_id)
        }
        await departmentApi.create(payload)
            .then(() => {
                setDisplay(false)
                setRefresh(true)
                window.alert('Data Successfully Insert')
            })
    }

    const onDelete = async (id) => {
        departmentApi.deleted(id)
            .then(() => {
                setRefresh(true)
                window.alert('Data Successfully Delete')
            })
    }

    return (
        <div>
            <div>
                <h2>List Department</h2>
                <button onClick={() => setDisplay(true)}> Add Department </button>
                {
                    display ?
                        <DepartmentAdd
                            onSubmit={onSubmit}
                            handleOnChange={handleOnChange}
                            setDisplay={setDisplay}
                        />
                        :
                        <>
                            <table>
                                <th>Department ID</th>
                                <th>Department Name</th>
                                <th>Location ID</th>
                                <tbody>
                                    {
                                        department && department.map(dept => (
                                            <tr key={dept.department_id}>
                                                <td>{dept.department_id}</td>
                                                <td>{dept.department_name}</td>
                                                <td>{dept.location_id}</td>
                                                <button onClick={() => onDelete(dept.department_id)}> Delete Country </button>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                }
            </div>
        </div>
    )
}