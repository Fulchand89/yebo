import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Eye,
  Edit2,
  UserX,
  UserCheck,
  Shield,
  Download,
  Filter,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  SearchBar,
  FilterBar,
  StatusBadge,
  ConfirmationDialog,
  AdminModal,
  Pagination,
} from '@/components/admin';
import { mockUsers } from '@/data/adminMockData';

export function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modals state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'suspend', // 'suspend' | 'activate'
    user: null,
  });

  const [editModalUser, setEditModalUser] = useState(null);

  // Filter options
  const statusOptions = [
    { value: 'All', label: 'All Statuses', count: users.length },
    { value: 'Active', label: 'Active', count: users.filter((u) => u.status === 'Active').length },
    { value: 'Suspended', label: 'Suspended', count: users.filter((u) => u.status === 'Suspended').length },
    { value: 'Inactive', label: 'Inactive', count: users.filter((u) => u.status === 'Inactive').length },
  ];

  // Filtering logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.includes(searchQuery) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || user.status === statusFilter;

      const matchesSub =
        subscriptionFilter === 'All' || user.subscription.toLowerCase().includes(subscriptionFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesSub;
    });
  }, [users, searchQuery, statusFilter, subscriptionFilter]);

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage]);

  // Handlers for Suspend / Activate
  const handleActionConfirm = () => {
    if (!confirmDialog.user) return;
    const isSuspend = confirmDialog.type === 'suspend';
    const newStatus = isSuspend ? 'Suspended' : 'Active';

    setUsers((prev) =>
      prev.map((u) => (u.id === confirmDialog.user.id ? { ...u, status: newStatus } : u))
    );

    toast.success(`User ${confirmDialog.user.name} has been ${newStatus.toLowerCase()}.`);
    setConfirmDialog({ isOpen: false, type: 'suspend', user: null });
  };

  // Handlers for Edit
  const handleEditSave = (e) => {
    e.preventDefault();
    if (!editModalUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === editModalUser.id ? editModalUser : u))
    );

    toast.success(`User ${editModalUser.name} updated successfully.`);
    setEditModalUser(null);
  };

  const columns = [
    {
      header: 'USER ID',
      key: 'id',
      render: (item) => (
        <span className="font-bold text-slate-900 text-xs">{item.id}</span>
      ),
    },
    {
      header: 'NAME',
      key: 'name',
      render: (item) => (
        <div>
          <div className="font-bold text-slate-900 text-xs">{item.name}</div>
          {item.personalInfo?.city && (
            <div className="text-[11px] text-slate-400 font-medium">{item.personalInfo.city}</div>
          )}
        </div>
      ),
    },
    {
      header: 'EMAIL',
      key: 'email',
      render: (item) => (
        <span className="text-slate-500 text-xs truncate max-w-[170px] block font-normal">
          {item.email}
        </span>
      ),
    },
    {
      header: 'MOBILE',
      key: 'mobile',
      render: (item) => (
        <span className="text-slate-600 text-xs font-medium whitespace-nowrap">
          {item.mobile}
        </span>
      ),
    },
    {
      header: 'STATUS',
      key: 'status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: 'BALANCE',
      key: 'balance',
      render: (item) => (
        <span className="font-bold text-slate-900 text-xs">{item.balance}</span>
      ),
    },
    {
      header: 'SUBSCRIPTION',
      key: 'subscription',
      render: (item) => (
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
          {item.subscription}
        </span>
      ),
    },
    {
      header: 'FORFEITURE',
      key: 'forfeiture',
      render: (item) => (
        <span
          className={`text-xs font-medium ${
            item.forfeiture !== '₹0.00' ? 'text-rose-500 font-bold' : 'text-slate-500'
          }`}
        >
          {item.forfeiture}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header Bar with Search & Filters */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <SearchBar
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, mobile or ID..."
            className="w-full sm:w-80"
          />

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <select
              value={subscriptionFilter}
              onChange={(e) => {
                setSubscriptionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subscriptions</option>
              <option value="VIP">VIP Members</option>
              <option value="Premium">Premium Tier</option>
              <option value="Free">Free Tier</option>
            </select>

            <button
              type="button"
              onClick={() => toast.success('Exporting users list (UI Demo)...')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <FilterBar
          options={statusOptions}
          activeValue={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
          showReset={searchQuery !== '' || statusFilter !== 'All' || subscriptionFilter !== 'All'}
          onReset={() => {
            setSearchQuery('');
            setStatusFilter('All');
            setSubscriptionFilter('All');
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Users Data Table */}
      <DataTable
        columns={columns}
        data={paginatedUsers}
        keyField="id"
        emptyTitle="No subscribers match your query"
        emptyDescription="Try clearing filters or checking spelling."
      />

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Suspend / Activate Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, type: 'suspend', user: null })}
        onConfirm={handleActionConfirm}
        variant={confirmDialog.type === 'suspend' ? 'warning' : 'success'}
        title={confirmDialog.type === 'suspend' ? 'Suspend User Access' : 'Reactivate User Account'}
        message={
          confirmDialog.type === 'suspend'
            ? `Are you sure you want to suspend access for ${confirmDialog.user?.name} (${confirmDialog.user?.id})? They will not be able to claim deals until reactivated.`
            : `Reactivate account for ${confirmDialog.user?.name}? All membership privileges will be restored.`
        }
        confirmLabel={confirmDialog.type === 'suspend' ? 'Suspend User' : 'Activate User'}
      />

      {/* Edit User Modal */}
      {editModalUser && (
        <AdminModal
          isOpen={Boolean(editModalUser)}
          onClose={() => setEditModalUser(null)}
          title={`Edit User: ${editModalUser.name}`}
          subtitle={`Account ID: ${editModalUser.id}`}
          icon={Edit2}
          footer={
            <>
              <button
                type="button"
                onClick={() => setEditModalUser(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                className="px-4 py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] rounded-xl transition shadow-xs"
              >
                Save Changes
              </button>
            </>
          }
        >
          <form onSubmit={handleEditSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editModalUser.name}
                  onChange={(e) => setEditModalUser({ ...editModalUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile</label>
                <input
                  type="text"
                  value={editModalUser.mobile}
                  onChange={(e) => setEditModalUser({ ...editModalUser, mobile: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={editModalUser.email}
                onChange={(e) => setEditModalUser({ ...editModalUser, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subscription Tier</label>
                <select
                  value={editModalUser.subscription}
                  onChange={(e) => setEditModalUser({ ...editModalUser, subscription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                >
                  <option value="VIP Member">VIP Member</option>
                  <option value="Premium">Premium</option>
                  <option value="Free Tier">Free Tier</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={editModalUser.status}
                  onChange={(e) => setEditModalUser({ ...editModalUser, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}

export default AdminUsersPage;
