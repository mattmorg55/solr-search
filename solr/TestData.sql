--select * from dbo.uas_Enterprise where [enterpriseId] = 7

--select
--	[EnterpriseID],
--	count(1) as [Count]
--from dbo.def_FormResults
--group by [EnterpriseID]
--order by count(1) desc

--select top 1000 * from dbo.def_FormResults where [EnterpriseID] = 7
--order by [CreatedDate] desc

--select top 1000 *
--from dbo.sis_Search as s 
--order by s.InterviewDate desc

--select top 1000 PatternCheckITEMS from dbo.vSearchGrid

select
	sg.formResultId as [Id],
	sg.FirstName,
	sg.LastName,
	convert(nvarchar(100), sg.formResultId) as [FormResultId],
	case when sg.[subject] is null or sg.[subject] < 1 then null
		else sg.[subject]
	end as [SubjectId],
	sg.TrackingNumber,
	sg.SSN,
	sg.InterviewerLoginID as [InterviewerUsername],
	g.GroupName,
	e.EnterpriseName,
	convert(nvarchar(100), sg.assigned) as [AssignedUserId],
	sg.dateUpdated as [Updated],
	sg.InterviewDate as [Interviewed],
	case when sg.[formId] = 1 then 'ADULT'
		when sg.[formId] = 2 then 'CHILD'
		else 'UNKNOWN'
	end as [SisVersion],
	case when sg.[formStatus] = 0 then 'NEW'
		when sg.[formStatus] = 1 then 'IN_PROGRESS'
		when sg.[formStatus] = 2 then 'COMPLETED'
		when sg.[formStatus] = 3 then 'ABANDONED'
		else 'UNKNOWN'
	end as [LevelOfCompletion],
	case when sg.[reviewStatus] = 0 then 'TO_BE_REVIEWED'
		when sg.[reviewStatus] = 1 then 'PRE_QA'
		when sg.[reviewStatus] = 2 then 'REVIEWED'
		when sg.[reviewStatus] = 3 then 'APPROVED'
		when sg.[reviewStatus] = 4 then 'CHECKED_OUT'
		when sg.[reviewStatus] = 5 then 'CHECKED_IN'
		else 'UNKNOWN'
	end as [ReviewStatus],
	case when sg.[deleted] = 1 then 'DELETED'
		when sg.[archived] = 1 then 'ARCHIVED'
		when sg.[training] = 1 then 'TRAINING'
		else 'NORMAL'
	end as [RecordStatus],
	sg.[PatternCheckITEMS] as [PatternCheckItems]
into dbo.test_SearchGrid
from dbo.vSearchGrid as sg
inner join dbo.uas_Group as g with (nolock) on g.GroupID = sg.GroupID
inner join dbo.uas_Enterprise as e with (nolock) on e.EnterpriseID = sg.EnterpriseID
