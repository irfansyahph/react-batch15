import React, { useState, useEffect } from 'react'
import jobApi from '../api/jobApi'
import JobAdd from './JobAdd'

export default function JobView() {
    const [job, setJob] = useState([])
    const [display, setDisplay] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [values, setValues] = useState({
        job_id: undefined,
        job_title: '',
        min_salary: undefined,
        max_salary: undefined
    })

    useEffect(() => {
        jobApi.get().then(data => {
            setJob(data)
        })
        setRefresh(false)
    }, [refresh])

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = async () => {
        const payload = {
            job_title: (values.job_title),
            min_salary: (values.min_salary),
            max_salary: (values.max_salary)
        }
        await jobApi.create(payload)
            .then(() => {
                setDisplay(false)
                setRefresh(true)
                window.alert('Data Successfully Insert')
            })
    }

    const onDelete = async (id) => {
        jobApi.deleted(id)
            .then(() => {
                setRefresh(true)
                window.alert('Data Successfully Delete')
            })
    }

    return (
        <div>
            <div>
                <h2>List Job</h2>
                <button onClick={() => setDisplay(true)}> Add Job </button>
                {
                    display ?
                        <JobAdd
                            onSubmit={onSubmit}
                            handleOnChange={handleOnChange}
                            setDisplay={setDisplay}
                        />
                        :
                        <>
                            <table>
                                <th>Job ID</th>
                                <th>Job Title</th>
                                <th>Min Salary</th>
                                <th>Max Salary</th>
                                <tbody>
                                    {
                                        job && job.map(job => (
                                            <tr key={job.job_id}>
                                                <td>{job.job_id}</td>
                                                <td>{job.job_title}</td>
                                                <td>{job.min_salary}</td>
                                                <td>{job.max_salary}</td>
                                                <button onClick={() => onDelete(job.job_id)}> Delete Region </button>
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