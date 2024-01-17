import express from 'express';
import * as diaryServices from '../services/diaryServices';
import toNewDairyEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res)=>{
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
})

router.get('/:id', (req, res)=>{
    const diary = diaryServices.findById(+req.params.id)
    return (diary != null)
     ? res.send(diary)
     : res.sendStatus(404);
})

router.post('/', (req, res) =>{
    try {
        const newDairyEntry = toNewDairyEntry(req.body)

        const addedDiaryentry = diaryServices.addDiary(newDairyEntry)
        res.json(addedDiaryentry)
      
    } catch (e:any) {
        res.status(400).send(e.message)
        
    }
    
    res.send('saving a diary!');
})


export default router;