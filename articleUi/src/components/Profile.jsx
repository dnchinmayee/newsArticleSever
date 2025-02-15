import React, { useState } from 'react';
import { MdPerson } from 'react-icons/md';

function Profile({ apiKey, setApiKey }) {
    const [showForm, setShowForm] = useState(false);

    function handleSave(e) {
        e.preventDefault();
        setApiKey(e.target.elements.apiKey.value);
        setShowForm(false);
    }

    return (
        <div className="absolute top-0 right-0 p-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={() => setShowForm(!showForm)}
        >
          <MdPerson size={24} />
        </button>
        {showForm && (
          <div className="absolute top-full right-0 bg-white shadow-md p-4 w-48">
            <form onSubmit={handleSave}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
                API Key
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apiKey"
                type="text"
                placeholder="Enter API Key"
                name="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    )
}

export default Profile;
