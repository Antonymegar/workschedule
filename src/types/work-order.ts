export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Open' | 'In Progress' | 'Done';

export type WorkOrder = {
  id: string;          
  title: string;       
  description: string; 
  priority: Priority;
  status: Status;
  updatedAt: string;   
};
