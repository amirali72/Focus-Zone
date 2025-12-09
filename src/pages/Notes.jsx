import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedNoteId, setSelectedNoteID] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const showNotes = (id) => {
    setSelectedNoteID(id);
    const showData = notes.find((note) => note.id === id);
    setInputTitle(showData.title);
    setInputText(showData.text);
  };

  const saveNote = () => {
    if (selectedNoteId !== null) {
      if (!inputText && !inputTitle) {
        alert("Please write a note");
        return;
      }
      const newList = notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { id: note.id, title: inputTitle, text: inputText };
        }
        return note;
      });
      setNotes(newList);
    } else {
      if (!inputText && !inputTitle) {
        alert("Please write a note");
        return;
      }
      const newNote = {
        id: Date.now(),
        title: inputTitle || "Untitled",
        text: inputText,
      };

      setNotes([...notes, newNote]);
      setInputTitle("");
      setInputText("");
    }
  };

  const deleteNote = (id) => {
    if (selectedNoteId === id) {
      setInputText("");
      setInputTitle("");
      setSelectedNoteID(null);
    }
    const newList = notes.filter((note) => note.id !== id);
    setNotes(newList);
  };

  useEffect(() => {
    const data = localStorage.getItem("notes");
    if (data) {
      const newData = JSON.parse(data);
      setNotes(newData);
    }
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isFirstRender]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">Notes</h1>
      <p className="text-gray-600 text-xs sm:text-base mb-4 sm:mb-6">
        Capture ideas that surface while you're in the zone.
      </p>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        <div className="w-full md:w-1/3 bg-emerald-50 border border-emerald-100 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="font-semibold text-gray-700 text-sm sm:text-base">All Notes</h2>
            <button
              onClick={() => {
                setSelectedNoteID(null);
                setInputText("");
                setInputTitle("");
              }}
              className="px-3 py-1 bg-teal-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm"
            >
              Add
            </button>
          </div>

          <div className="max-h-64 md:max-h-96 overflow-y-auto">
            {notes.map((note) => {
              return (
                <div
                  key={note.id}
                  className={`p-3 sm:p-4 rounded-lg mb-2 sm:mb-3 cursor-pointer border transition relative
                  ${
                    note.id === selectedNoteId
                      ? "bg-white border-emerald-400 shadow-sm"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }
                `}
                  onClick={() => showNotes(note.id)}
                >
                  <h1 className="font-semibold text-gray-800 text-sm sm:text-base pr-6">{note.title}</h1>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
                    {note.text}
                  </p>

                  <Trash2
                    size={18}
                    className="absolute right-2 top-2 sm:right-3 sm:top-3 sm:w-5 sm:h-5 text-gray-400 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-2/3 bg-emerald-50 border border-emerald-100 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex gap-2 sm:gap-3 mb-3">
            <input
              type="text"
              placeholder="Note title..."
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="flex-1 bg-white p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm sm:text-base"
            />
            <button
              onClick={saveNote}
              className="px-3 sm:px-4 bg-teal-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm"
            >
              Save
            </button>
          </div>

          <textarea
            placeholder="Start writing your note..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="bg-white p-2 sm:p-3 rounded-lg w-full h-48 sm:h-56 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm sm:text-base"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Notes;