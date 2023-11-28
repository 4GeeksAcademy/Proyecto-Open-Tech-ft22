import React from 'react';
import { Link } from 'react-router-dom';

export const FormManual = () => {
    return (
        <div className="formManual" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                Submit information
            </h1>

            <form className='mx-auto p-3 border-1 w-25' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>
                <div className="mb-3">
                    <label htmlFor="roleInput" className="form-label" style={{ color: 'white' }}>Specific role</label>
                    <input type="text" className="form-control" id="roleInput" />
                </div>

                <div className="mb-3">
                    <label htmlFor="categoryInput" className="form-label" style={{ color: 'white' }}>IT category</label>
                    <input type="text" className="form-control" id="categoryInput" />
                </div>

                <div className="mb-3">
                    <label htmlFor="yearsInput" className="form-label" style={{ color: 'white' }}>Years of experience</label>
                    <input type="text" className="form-control" id="yearsInput" />
                </div>

                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label" style={{ color: 'white' }}>City</label>
                    <input type="text" className="form-control" id="cityInput" />
                </div>

                <div className="mb-3">
                    <label htmlFor="countryInput" className="form-label" style={{ color: 'white' }}>Country</label>
                    <input type="text" className="form-control" id="countryInput" />
                </div>

                <div className="mb-3">
                    <label htmlFor="salaryInput" className="form-label" style={{ color: 'white' }}>Monthly salary</label>
                    <input type="text" className="form-control" id="salaryInput" />
                </div>


                <button className="btn w-100" style={{ backgroundColor: '#4f89ee' }}>Submit</button>
            </form>


            <div className='text-center my-4'>
                <Link to="/">
                    <p>Go back Home</p>
                </Link>
            </div>

        </div>
    );
};