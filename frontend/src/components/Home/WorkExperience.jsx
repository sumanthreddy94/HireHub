import React from 'react'
import InputField from './InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Work Experience</h4>
      <div>
        <label className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value='' onChange={handleChange} />
            <span className='checkmark'></span>Any Experience
        </label>

        <InputField handleChange={handleChange} value="Entry-Level" title="Entry-Level" name="test" />
        <InputField handleChange={handleChange} value="Associate-Level" title="Associate-Level" name="test" />
        <InputField handleChange={handleChange} value="Mid-Level" title="Mid-Level" name="test" />
        <InputField handleChange={handleChange} value="Senior-Level" title="Senior-Level" name="test" />
      </div>
    </div>
  )
}

export default WorkExperience
