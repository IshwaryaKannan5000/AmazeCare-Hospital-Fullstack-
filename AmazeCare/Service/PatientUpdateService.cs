using AmazeCare.Exceptions;
using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;

public class PatientUpdateService : IPatientUpdateService
{
    private readonly IUserRepository _userRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly ILogger<PatientUpdateService> _logger;

    public PatientUpdateService(
        IUserRepository userRepository,
        IPatientRepository patientRepository,
        ILogger<PatientUpdateService> logger
      )
    {
        _userRepository = userRepository;
        _patientRepository = patientRepository;
        _logger = logger;

    }

    public async Task<bool> UpdatePatientAsync(UpdatePatientDto dto)
    {
        if (dto == null)
        {
            _logger.LogWarning("UpdatePatientAsync called with null DTO.");
            throw new ArgumentNullException(nameof(dto), "Update request cannot be null.");
        }

        _logger.LogInformation("Starting update for user ID: {UserId}", dto.UserId);

        var user = await _userRepository.GetUserById(dto.UserId);
        if (user == null)
        {
            _logger.LogError("User not found for ID: {UserId}", dto.UserId);
            throw new PatientNotFoundException();
        }

        var patient = await _patientRepository.GetByUserId(dto.UserId);
        if (patient == null)
        {
            _logger.LogError("Patient not found for user ID: {UserId}", dto.UserId);
            throw new PatientNotFoundException();

        }

        if (user.ContactNo == null) throw new MissingUserFieldException("ContactNo is null in the database.");
        if (user.FullName == null) throw new MissingUserFieldException("FullName is null in the database.");
        if (user.Gender == null) throw new MissingUserFieldException("Gender is null in the database.");
        if (user.DateOfBirth == default) throw new MissingUserFieldException("DateOfBirth is not set in the database.");
        if (patient.MedicalHistory == null) throw new MissingPatientFieldException("MedicalHistory is null in the database.");

        _logger.LogInformation("Updating fields for user ID: {UserId}", dto.UserId);

        // Update fields if present
        if (!string.IsNullOrEmpty(dto.FullNameUpdate?.NewFullName))
            user.FullName = dto.FullNameUpdate.NewFullName;

        if (!string.IsNullOrEmpty(dto.ContactNoUpdate?.NewContactNo))
            user.ContactNo = dto.ContactNoUpdate.NewContactNo;

        if (!string.IsNullOrEmpty(dto.GenderUpdate?.NewGender))
            user.Gender = dto.GenderUpdate.NewGender;

        if (dto.DateOfBirthUpdate != null)
            user.DateOfBirth = dto.DateOfBirthUpdate.NewDateOfBirth;

        if (!string.IsNullOrEmpty(dto.MedicalHistoryUpdate?.NewMedicalHistory))
            patient.MedicalHistory = dto.MedicalHistoryUpdate.NewMedicalHistory;

        await _userRepository.UpdateUser(user);
        await _patientRepository.Update(patient);

        _logger.LogInformation("Successfully updated user and patient data for user ID: {UserId}", dto.UserId);

        return true;
    }
}
