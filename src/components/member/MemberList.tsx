import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPlus, FiUsers } from 'react-icons/fi';
import MemberForm from './MemberForm';
import { Member } from '../../types';
import Card3D from '../3d/Card3D';
import Button3D from '../3d/Button3D';
import Input3D from '../3d/Input3D';

interface MemberListProps {
  members: Member[];
  onAddMember: (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdateMember: (id: string, data: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  onDeleteMember: (id: string) => Promise<void>;
  isLoading: boolean;
}

const MemberList = ({
  members,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  isLoading
}: MemberListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    await onAddMember(data);
    setShowAddForm(false);
  };

  const handleUpdateMember = async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingMember) {
      await onUpdateMember(editingMember.id, data);
      setEditingMember(null);
    }
  };

  const handleDeleteMember = async (member: Member) => {
    await onDeleteMember(member.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-lg mr-4 shadow-lg">
            <FiUsers className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <span className="text-gradient">Members</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your organization members</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Input3D
              id="search"
              name="search"
              label="Search members"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="search"
            />
          </div>

          <div className="self-end">
            <Button3D
              onClick={() => setShowAddForm(true)}
              color="primary"
              icon="add"
              size="md"
            >
              Add Member
            </Button3D>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <MemberForm
              onSubmit={handleAddMember}
              onCancel={() => setShowAddForm(false)}
            />
          </motion.div>
        )}

        {editingMember && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <MemberForm
              initialData={editingMember}
              onSubmit={handleUpdateMember}
              onCancel={() => setEditingMember(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-full"
            >
              <Card3D
                member={member}
                onEdit={setEditingMember}
                onDelete={handleDeleteMember}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-10 text-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                <FiUsers className="text-indigo-400 text-4xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                {searchTerm ? (
                  <span className="material-icons text-white text-sm">search_off</span>
                ) : (
                  <span className="material-icons text-white text-sm">add</span>
                )}
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            {searchTerm ? 'No members found' : 'No members yet'}
          </h3>

          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {searchTerm
              ? `We couldn't find any members matching "${searchTerm}". Try a different search term or clear the search.`
              : "Your organization doesn't have any members yet. Get started by adding your first member to the system."}
          </p>

          {!searchTerm ? (
            <Button3D
              onClick={() => setShowAddForm(true)}
              color="primary"
              icon="add"
              size="lg"
            >
              Add Your First Member
            </Button3D>
          ) : (
            <Button3D
              onClick={() => setSearchTerm('')}
              color="secondary"
              icon="clear"
              size="md"
            >
              Clear Search
            </Button3D>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MemberList;
