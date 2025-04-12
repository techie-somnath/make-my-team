import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaCalendarCheck,
} from "react-icons/fa";

type TeamMember = {
  employeeId: string;
  name: string;
  photoUrl?: string;
  bio?: string;
  skills: string[];
  yearsOfExperience: number;
  designation: string;
  certifications: string[];
  pastProjects: string[];
  availability: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
};

type ModalProps = {
  member: TeamMember;
  onClose: () => void;
};

export default function ProfileModal({ member, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <h2 className="text-xl font-semibold">{member.name}</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ✕
          </button>
        </div>

        {/* Profile Picture and Details */}
        <div className="flex flex-col md:flex-row items-center md:items-start p-6">
          <img
            src={member.photoUrl || "/default-profile.png"}
            alt={`${member.name}'s photo`}
            className="w-32 h-32 rounded-full shadow-md mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium">{member.designation}</h3>
            <p className="text-gray-600">{member.bio || "No bio available."}</p>
            <div className="mt-4">
              <p className="flex items-center text-gray-700">
                <FaCalendarCheck className="mr-2" />
                <strong>Availability:</strong> {member.availability}
              </p>
              {member.email && (
                <p className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2" />
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </p>
              )}
              {member.phone && (
                <p className="flex items-center text-gray-700">
                  <FaPhone className="mr-2" />
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${member.phone}`}>{member.phone}</a>
                </p>
              )}
              {member.linkedinUrl && (
                <p className="flex items-center text-gray-700">
                  <FaLinkedin className="mr-2" />
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Certifications</h4>
            {member.certifications.length > 0 ? (
              <ul className="list-disc list-inside">
                {member.certifications.map((cert) => (
                  <li key={cert} className="text-gray-700">
                    {cert}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No certifications available.</p>
            )}
          </div>

          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Past Projects</h4>
            {member.pastProjects.length > 0 ? (
              <ul className="list-disc list-inside">
                {member.pastProjects.map((project) => (
                  <li key={project} className="text-gray-700">
                    {project}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No projects available.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
