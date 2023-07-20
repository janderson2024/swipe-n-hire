export default function EditPosting() {
  
  return (
    <>
    <main>
      <div>
        <h1 className="text-2xl block text-center font-semibold text-purple-700 mt-4">Add/Edit Job Posting</h1>
        <hr className='mt-4'></hr>
      </div>
      
      <div>
      <form>
        <div className="flex justify-around py-5">
          <div>
            <div className="py-2">
              <input type = "text" placeholder="Job Title" 
                id="jobTitle" name ="jobTitle" 
                className="border w-4/5 text-base px-2 py-1 border-gray-600"/>
              </div>
            <div className="py-2">
              <input type = "text" placeholder="Job ID Number" 
                id="jodId" name ="jobId" 
                className="border w-4/5 text-base px-2 py-1 border-gray-600"/>
            </div>
          </div>
            
          <div>
            <div className="py-2">
              <input type = "text" placeholder="Department" 
                id="department" name ="department" 
                className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
            </div>

            <div className="py-2">
              <input type = "text" placeholder="Employment Type" 
                id="emplType" name ="emplType" 
                className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
            </div>
          </div>
              
          <div>
            <div className="py-2">
              <input type = "text" placeholder="Salary Range" 
                id="salaryRange" name ="salaryRange" 
                className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
            </div>

            <div className="py-2">
              <input type = "text" placeholder="Location" 
                id="jobTitle" name ="jobTitle" 
                className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
            </div>
          </div>
              
          <div>
            <div className="py-2">
              <button type="button" className="w-full border-2 border-purple-700 bg-purple-700 text-white px-2 py-1">Position Filled</button>
            </div>

            <div className="py-2">
              {/* Toggle Button Here*/}
              <button type="button" className="w-full border-2 border-purple-700 bg-purple-700 text-white px-3 py-1">Toggle</button>
            </div>
          </div>
        </div>
            
        <div className = 'flex justify-center px-5 py-4'>  
          <textarea id="jobDescription" name ="jobDescription" placeholder="Enter job description here" 
            rows={8}
            className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
        </div>
            <div className="flex justify-center">
              <button type="button" className="justify-center w-40 border-2 border-purple-700 bg-purple-700 text-white py-1">Save Posting</button>
            </div>
      </form>
      </div>
    </main>
    </>
  );
}

/*export default function EditPosting() {
  return (
    <>
      <div>
        <NavBar
          LeftItem={BackToOpenings}
          CenterItem={PostingsNavBar}
          RightItem={HRProfileImage}
        />
      </div>

      <main>
        <div>
          <h1 className="text-2xl block text-center font-semibold text-purple-700 mt-4">
            Add/Edit Job Posting
          </h1>
          <hr className="mt-4"></hr>
        </div>

        <div>
          <form>
            <div className="flex justify-around py-5">
              <div>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Job Title"
                    id="jobTitle"
                    name="jobTitle"
                    className="border w-4/5 text-base px-2 py-1 border-gray-600"
                  />
                </div>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Job ID Number"
                    id="jodId"
                    name="jobId"
                    className="border w-4/5 text-base px-2 py-1 border-gray-600"
                  />
                </div>
              </div>

              <div>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Department"
                    id="department"
                    name="department"
                    className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                  />
                </div>

                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Employment Type"
                    id="emplType"
                    name="emplType"
                    className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                  />
                </div>
              </div>

              <div>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Salary Range"
                    id="salaryRange"
                    name="salaryRange"
                    className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                  />
                </div>

                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Location"
                    id="jobTitle"
                    name="jobTitle"
                    className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                  />
                </div>
              </div>

              <div>
                <div className="py-2">
                  <button
                    type="button"
                    className="w-full border-2 border-purple-700 bg-purple-700 text-white px-2 py-1"
                  >
                    Position Filled
                  </button>
                </div>

                <div className="py-2">
                  {/* Toggle Button Here}
                  <button
                    type="button"
                    className="w-full border-2 border-purple-700 bg-purple-700 text-white px-3 py-1"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center px-5 py-4">
              <textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Enter job description here"
                rows={8}
                className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="justify-center w-40 border-2 border-purple-700 bg-purple-700 text-white py-1"
              >
                Save Posting
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
*/