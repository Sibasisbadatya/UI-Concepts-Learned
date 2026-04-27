import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Button, Typography, Paper, Grid, 
  IconButton, FormHelperText, Divider 
} from '@mui/material';
import { 
  CloudUpload as UploadIcon, 
  Movie as VideoIcon, 
  Mic as AudioIcon, 
  Description as FileIcon 
} from '@mui/icons-material';

const AssignmentForm = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Watch the file fields to show the selected filename in the UI
  const watchedFiles = watch(["assignmentFile", "videoFile", "audioFile"]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("assignmentFile", data.assignmentFile[0]);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("audioFile", data.audioFile[0]);

    try {
      const response = await fetch("http://localhost:8080/api/assignments/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) alert("Upload successful!");
      else alert("Upload failed.");
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to render a styled file input section
  const FileUploadSection = ({ label, name, icon, accept, required }) => (
    <Grid item xs={12}>
      <Box sx={{ mb: 2, p: 2, border: '1px dashed #ccc', borderRadius: 2 }}>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {label} {required && "*"}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon />}
            color={errors[name] ? "error" : "primary"}
          >
            Choose File
            <input
              type="file"
              hidden
              accept={accept}
              {...register(name, { required: required ? `${label} is required` : false })}
            />
          </Button>
          <Typography variant="caption">
            {watchedFiles[0] && watchedFiles[0][0] ? (
              <Box display="flex" alignItems="center" gap={0.5}>
                {icon} {watchedFiles[watchedFiles.indexOf(name)]?.[0]?.name || "Selected"}
              </Box>
            ) : (
              "No file selected"
            )}
          </Typography>
        </Box>
        {errors[name] && (
          <FormHelperText error>{errors[name].message}</FormHelperText>
        )}
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Submit Assignment
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Upload your document, video explanation, and optional audio notes.
      </Typography>
      
      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          
          {/* Main Document (PDF/DOC) */}
          <FileUploadSection 
            label="Assignment Document" 
            name="assignmentFile" 
            accept=".pdf,.doc,.docx" 
            icon={<FileIcon fontSize="small"/>}
            required 
          />

          {/* Video File */}
          <FileUploadSection 
            label="Video Explanation" 
            name="videoFile" 
            accept="video/*" 
            icon={<VideoIcon fontSize="small"/>}
            required 
          />

          {/* Audio File */}
          <FileUploadSection 
            label="Audio Note (Optional)" 
            name="audioFile" 
            accept="audio/*" 
            icon={<AudioIcon fontSize="small"/>}
          />

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ py: 1.5 }}
            >
              {isSubmitting ? "Uploading Files..." : "Submit to Course"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AssignmentForm;