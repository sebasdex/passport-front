
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularUnderLoad() {
    return (
        <div className="flex justify-center items-center h-screen w-screen bg-blue-900">
            <CircularProgress size={50} />
        </div>
    )
}
