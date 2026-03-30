import React from 'react';
import { Calendar, MapPin, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
      <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-orange-50">
        <div className="md:w-2/5 bg-[#fff7ed] p-12 md:p-16 text-gray-800 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6F00]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <h2 className="text-3xl font-bold mb-8 relative z-10">Contact Information</h2>
          <div className="space-y-6 relative z-10">
            {/* Chat Support */}
            <div className="relative bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
              <div className="flex items-start pr-24">
                <div className="w-12 h-12 bg-[#fff7ed] border border-orange-100 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageSquare size={18} className="text-[#FF6F00]" />
                </div>
                <div>
                  <h4 className="font-bold text-md mb-1">Chat Support</h4>
                  <p className="text-gray-600 text-sm">Need quick help? Chat with our support team instantly on WhatsApp.</p>
                </div>
              </div>
              <a
                href={`https://wa.me/91${"8707007160"}`}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 top-4 z-10 inline-flex items-center px-3 py-2 bg-[#FF6F00] text-white rounded-lg shadow-md border border-[#ff8f00] hover:opacity-95 text-sm"
              >
                Start Chat
              </a>
            </div>

            {/* Phone Support */}
            <div className="relative bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
              <div className="flex items-start pr-24">
                <div className="w-12 h-12 bg-[#fff7ed] border border-orange-100 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone size={18} className="text-[#FF6F00]" />
                </div>
                <div>
                  <h4 className="font-bold text-md mb-1">Phone Support</h4>
                  <a className="text-gray-600 text-sm block" href="tel:1234567890">1234567890</a>
                </div>
              </div>
            </div>

            {/* Email Inquiries */}
            <div className="relative bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
              <div className="flex items-start pr-24">
                <div className="w-12 h-12 bg-[#fff7ed] border border-orange-100 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail size={18} className="text-[#FF6F00]" />
                </div>
                <div>
                  <h4 className="font-bold text-md mb-1">Email Inquiries</h4>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div>support@vaidikpooja.example</div>
                    <div>info@vaidikpooja.example</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Location */}
            <div className="relative bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
              <div className="flex items-start pr-24">
                <div className="w-12 h-12 bg-[#fff7ed] border border-orange-100 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin size={18} className="text-[#FF6F00]" />
                </div>
                <div>
                  <h4 className="font-bold text-md mb-1">Our Location</h4>
                  <p className="text-gray-600 text-sm">National Coordination Desk, New Delhi, India</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('National Coordination Desk, New Delhi, India')}`}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 top-4 z-10 inline-flex items-center px-3 py-2 bg-[#FF6F00] text-white rounded-lg shadow-md border border-[#ff8f00] hover:opacity-95 text-sm"
              >
                View Map
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 p-16">
          <ContactForm />
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}

function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [preferred, setPreferred] = React.useState('Email');
  const [requestCallback, setRequestCallback] = React.useState(false);
  const [callbackDate, setCallbackDate] = React.useState('');
  const [callbackTime, setCallbackTime] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [urgency, setUrgency] = React.useState('normal');
  const [loading, setLoading] = React.useState(false);

  const API = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          preferred_contact_method: preferred,
          request_callback: requestCallback,
          callback_date: requestCallback ? callbackDate : null,
          callback_time: requestCallback ? callbackTime : null,
          subject,
          message,
          urgency
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || body.message || 'Failed to send message');
      }
      const data = await res.json();
      // success
      setName(''); setEmail(''); setPhone(''); setPreferred('Email'); setRequestCallback(false); setCallbackDate(''); setCallbackTime(''); setSubject(''); setMessage(''); setUrgency('normal');
      window.alert('Message sent successfully! Reference ID: ' + (data.id || 'N/A'));
    } catch (err) {
      console.error('Contact submit error:', err);
      window.alert('Failed to send message: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Optional: 1234567890" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Preferred Contact Method</label>
          <select value={preferred} onChange={(e) => setPreferred(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none">
            <option>Email</option>
            <option>Phone</option>
            <option>WhatsApp</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input id="cb" checked={requestCallback} onChange={(e) => setRequestCallback(e.target.checked)} type="checkbox" className="w-4 h-4" />
        <label htmlFor="cb" className="text-sm text-gray-600">Request a callback</label>
      </div>

      {requestCallback && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Preferred Date</label>
            <input value={callbackDate} onChange={(e) => setCallbackDate(e.target.value)} type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Preferred Time</label>
            <input value={callbackTime} onChange={(e) => setCallbackTime(e.target.value)} type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none" />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Pooja Booking / Ritual Support / General Query" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="Describe your pooja requirements so we can assist you better..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all resize-none" required />
      </div>

      <div className="flex items-center space-x-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Urgency</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center"><input type="radio" name="urgency" value="normal" checked={urgency==='normal'} onChange={() => setUrgency('normal')} className="mr-2" />Normal</label>
            <label className="inline-flex items-center"><input type="radio" name="urgency" value="urgent" checked={urgency==='urgent'} onChange={() => setUrgency('urgent')} className="mr-2" />Urgent</label>
          </div>
        </div>
      </div>

      <button disabled={loading} className="w-full bg-[#FF6F00] hover:bg-[#FF9933] text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-orange-100 transform hover:scale-[1.02]">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
