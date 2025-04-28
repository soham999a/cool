import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Member } from '../../types';
import Input3D from '../3d/Input3D';
import Button3D from '../3d/Button3D';

interface MemberFormProps {
  initialData?: Member;
  onSubmit: (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const MemberForm = ({ initialData, onSubmit, onCancel }: MemberFormProps) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [memberId, setMemberId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhoneNumber(initialData.phoneNumber);
      setAddress(initialData.address);
      setMemberId(initialData.memberId);
      setBloodGroup(initialData.bloodGroup);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!memberId.trim()) newErrors.memberId = 'Member ID is required';
    if (!bloodGroup) newErrors.bloodGroup = 'Blood group is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        name,
        phoneNumber,
        address,
        memberId,
        bloodGroup
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative glass-effect p-8 max-w-2xl mx-auto"
      style={{
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        transform: 'perspective(1000px) rotateX(1deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {initialData ? 'Edit Member' : 'Add New Member'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {initialData ? 'Update member information' : 'Enter member details to add to the system'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <FiX className="text-gray-300" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name field */}
        <Input3D
          id="name"
          name="name"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          error={errors.name}
          icon="person"
        />

        {/* Phone Number field */}
        <Input3D
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1 (123) 456-7890"
          required
          error={errors.phoneNumber}
          icon="phone"
        />

        {/* Address field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Address
            <span className="text-pink-500 ml-1">*</span>
          </label>
          <div className="relative border border-gray-600 rounded-lg overflow-hidden transition-all duration-200 bg-gray-800 shadow-md hover:shadow-lg">
            <div className="flex items-center px-3">
              <span className="material-icons text-indigo-400 mr-2">home</span>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-3 px-1 outline-none bg-transparent text-gray-100 min-h-[80px] resize-none"
                placeholder="123 Main St, City, Country"
                required
              />
            </div>
          </div>
          {errors.address && (
            <p className="text-red-400 text-xs mt-1 flex items-center">
              <span className="material-icons text-xs mr-1">error</span>
              {errors.address}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Member ID field */}
          <Input3D
            id="memberId"
            name="memberId"
            label="Member ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="MEM-12345"
            required
            error={errors.memberId}
            icon="badge"
          />

          {/* Blood Group field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Blood Group
              <span className="text-pink-500 ml-1">*</span>
            </label>
            <div className="relative border border-gray-600 rounded-lg overflow-hidden transition-all duration-200 bg-gray-800 shadow-md hover:shadow-lg">
              <div className="flex items-center px-3">
                <span className="material-icons text-pink-500 mr-2">water_drop</span>
                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full py-3 px-1 outline-none bg-transparent text-gray-100 appearance-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group} className="bg-gray-800">
                      {group}
                    </option>
                  ))}
                </select>
                <span className="material-icons text-indigo-400">arrow_drop_down</span>
              </div>
            </div>
            {errors.bloodGroup && (
              <p className="text-red-400 text-xs mt-1 flex items-center">
                <span className="material-icons text-xs mr-1">error</span>
                {errors.bloodGroup}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button3D
            onClick={onCancel}
            color="secondary"
            type="button"
          >
            Cancel
          </Button3D>

          <Button3D
            onClick={() => {}}
            color="primary"
            icon="save"
            type="submit"
          >
            {initialData ? 'Update' : 'Save'}
          </Button3D>
        </div>
      </form>
    </motion.div>
  );
};

export default MemberForm;
