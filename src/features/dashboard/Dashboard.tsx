import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Member } from '../../types';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import StatCard from './StatCard';
import BloodGroupChart from './BloodGroupChart';
import RecentMembersList from './RecentMembersList';

interface DashboardProps {
  members: Member[];
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ members, isLoading }) => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    newMembersThisMonth: 0,
    bloodGroupDistribution: {} as Record<string, number>,
    recentMembers: [] as Member[]
  });

  useEffect(() => {
    if (members.length > 0) {
      // Calculate total members
      const totalMembers = members.length;

      // Calculate new members this month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const newMembersThisMonth = members.filter(member => member.createdAt >= startOfMonth).length;

      // Calculate blood group distribution
      const bloodGroupDistribution: Record<string, number> = {};
      members.forEach(member => {
        if (bloodGroupDistribution[member.bloodGroup]) {
          bloodGroupDistribution[member.bloodGroup]++;
        } else {
          bloodGroupDistribution[member.bloodGroup] = 1;
        }
      });

      // Get recent members (last 5)
      const recentMembers = [...members]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5);

      setStats({
        totalMembers,
        newMembersThisMonth,
        bloodGroupDistribution,
        recentMembers
      });
    }
  }, [members]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      {/* Stats Overview */}
      <Row className="g-4">
        <Col xs={12} sm={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-100"
          >
            <StatCard
              title="Total Members"
              value={stats.totalMembers.toString()}
              icon="people"
              color="indigo"
            />
          </motion.div>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="h-100"
          >
            <StatCard
              title="New This Month"
              value={stats.newMembersThisMonth.toString()}
              icon="person_add"
              color="purple"
            />
          </motion.div>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="h-100"
          >
            <StatCard
              title="Most Common Blood Group"
              value={Object.entries(stats.bloodGroupDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              icon="water_drop"
              color="pink"
            />
          </motion.div>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="h-100"
          >
            <StatCard
              title="Last Updated"
              value={members.length > 0 ? new Date(Math.max(...members.map(m => m.updatedAt))).toLocaleDateString() : 'N/A'}
              icon="update"
              color="blue"
            />
          </motion.div>
        </Col>
      </Row>

      {/* Main Dashboard Content */}
      <Row className="g-4">
        {/* Blood Group Distribution */}
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="h-100"
          >
            <Card className="card-glass h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h5 className="fw-bold text-gradient">Blood Groups</h5>
                    <p className="text-muted small mb-0">Member distribution</p>
                  </div>
                  <div className="bg-dark p-2 rounded">
                    <i className="bi bi-droplet-fill text-secondary"></i>
                  </div>
                </div>
                <BloodGroupChart distribution={stats.bloodGroupDistribution} />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Quick Actions */}
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="h-100"
          >
            <Card className="card-glass h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h5 className="fw-bold text-gradient">Quick Actions</h5>
                    <p className="text-muted small mb-0">Manage your organization</p>
                  </div>
                  <div className="bg-dark p-2 rounded">
                    <i className="bi bi-lightning-charge-fill text-primary"></i>
                  </div>
                </div>

                <Row className="g-3">
                  <Col xs={6}>
                    <Card className="card-glass h-100 text-center p-3 cursor-pointer">
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-people-fill text-primary fs-4 mb-2"></i>
                        <span>Manage Members</span>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={6}>
                    <Card className="card-glass h-100 text-center p-3 cursor-pointer">
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-person-plus-fill text-secondary fs-4 mb-2"></i>
                        <span>Add Member</span>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={6}>
                    <Card className="card-glass h-100 text-center p-3 cursor-pointer">
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-credit-card-fill" style={{ color: 'var(--bs-accent)' }}></i>
                        <span className="mt-2">Payments</span>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={6}>
                    <Card className="card-glass h-100 text-center p-3 cursor-pointer">
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-headset text-info fs-4 mb-2"></i>
                        <span>Get Support</span>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Recent Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="card-glass">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h5 className="fw-bold text-gradient">Recent Members</h5>
                <p className="text-muted small mb-0">Latest additions to your organization</p>
              </div>
              <div className="bg-dark p-2 rounded">
                <i className="bi bi-people-fill text-info"></i>
              </div>
            </div>
            <RecentMembersList members={stats.recentMembers} />
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
