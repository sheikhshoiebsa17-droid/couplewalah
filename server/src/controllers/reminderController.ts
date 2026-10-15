import { Response } from 'express';
import { Reminder } from '../models/Reminder';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getReminders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ eventDate: 1 });
    res.json({ success: true, data: reminders });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createReminder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, occasionType, eventDate, recipientName, daysInAdvance, emailNotification } = req.body;
    const reminder = await Reminder.create({
      userId: req.user._id,
      title,
      occasionType,
      eventDate: new Date(eventDate),
      recipientName,
      daysInAdvance: daysInAdvance || 7,
      emailNotification: emailNotification !== false,
      isActive: true,
    });
    res.status(201).json({ success: true, data: reminder });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateReminder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found.' });
    }
    res.json({ success: true, data: reminder });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteReminder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found.' });
    }
    res.json({ success: true, message: 'Reminder deleted.' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
